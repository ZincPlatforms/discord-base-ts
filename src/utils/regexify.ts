export function validatePattern(pattern: string): RegExp {
    let escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    escaped = escaped.replace(/\[([^\]]+)\]/g, (_: string, content: string) => {
        if (content.startsWith('...')) return `(?:\\s+.+)`;

        if (content.includes('/')) {
            const opts = content.split('/').map((o) => o.trim()).join('|');
            return `\\s+(?:${opts})`;
        }

        return `\\s+\\S+`;
    });

    escaped = escaped.replace(/<([^>]+)>/g, (_, content: string) => {
        if (content.startsWith('...')) return `(?:\\s+.+)?`;

        if (content.includes('/')) {
            const opts = content.split('/').map(o => o.trim()).join('|');
            return `(?:\\s+(?:${opts}))?`;
        }

        return `(?:\\s+\\S+)?`;
    });

    return new RegExp(`^${escaped.trim()}$`, 'i');
}
