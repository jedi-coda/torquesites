import getConfig from 'next/config';

export function withBasePath(path: string) {
  // Works both server/client; safe if no runtime config is present
  try {
    const cfg = getConfig() || {};
    const pub = (cfg.publicRuntimeConfig as any) || {};
    const srv = (cfg.serverRuntimeConfig as any) || {};
    const basePath = pub.basePath || srv.basePath || '';
    return `${basePath}${path}`;
  } catch {
    return path;
  }
}
