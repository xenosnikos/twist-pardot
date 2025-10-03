import mdSource from '../BUSINESS.MD?raw';

export type SlideNode = {
  id: string;
  title: string;
  level: 1|2|3;
  content: string; // raw markdown without the heading line
  children: SlideNode[];
  parentId?: string;
};

export function parseSlides(): SlideNode[] {
  const lines = mdSource.replace(/\r\n?/g, '\n').split('\n');
  const slides: SlideNode[] = [];
  const stack: SlideNode[] = [];

  let buffer: string[] = [];
  let current: SlideNode | null = null;

  const flush = () => {
    if (current) current.content = buffer.join('\n').trim();
    buffer = [];
  };

  const newNode = (title: string, level: 1|2|3): SlideNode => {
    const id = slug(`${title}-${level}-${slides.length + Math.random().toString(36).slice(2,6)}`);
    const node: SlideNode = { id, title, level, content: '', children: [] };
    return node;
  };

  const attach = (node: SlideNode) => {
    if (node.level === 1) {
      slides.push(node); stack.length = 0; stack.push(node); current = node; return;
    }
    // find parent in stack
    while (stack.length && (stack[stack.length-1].level >= node.level)) stack.pop();
    const parent = stack[stack.length-1] || slides[slides.length-1];
    node.parentId = parent?.id;
    if (parent) parent.children.push(node);
    stack.push(node);
    current = node;
  };

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);
    if (h1 || h2 || h3) {
      flush();
      const title = (h1?.[1] || h2?.[1] || h3?.[1]).trim();
      const level = (h1?1:(h2?2:3)) as 1|2|3;
      const node = newNode(title, level);
      attach(node);
      continue;
    }
    if (current) buffer.push(line);
  }
  flush();
  return slides;
}

export function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

