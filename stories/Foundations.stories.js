export default {
  title: 'Foundations/Tokens',
  parameters: { docs: { description: { component: 'Space, shape and the two hatch patterns. Colour and type are on the Introduction page.' } } },
};

const SPACE = [1, 2, 3, 4, 5, 6, 7, 8];
export const Space = {
  render: () => `<div class="nb-stack">${SPACE.map(n => `<div class="nb-row"><code class="nb-mono">--nb-space-${n}</code><span class="sb-space" data-n="${n}"></span></div>`).join('')}</div>
    <style>.sb-space{display:block;height:16px;background:var(--nb-ink);border-radius:4px}${SPACE.map(n => `.sb-space[data-n="${n}"]{width:var(--nb-space-${n})}`).join('')}</style>`,
};

export const Radii = {
  render: () => `<div class="nb-row">${['sm', 'md', 'lg', 'xl', 'cell', 'pill'].map(r => `<div class="nb-stack" style="align-items:center"><span class="sb-r" data-r="${r}"></span><code class="nb-mono">${r}</code></div>`).join('')}</div>
    <style>.sb-r{display:block;width:64px;height:64px;background:var(--nb-panel);box-shadow:inset 0 0 0 1.5px var(--nb-ink)}${['sm', 'md', 'lg', 'xl', 'cell', 'pill'].map(r => `.sb-r[data-r="${r}"]{border-radius:var(--nb-radius-${r})}`).join('')}</style>`,
};

export const Hatching = {
  render: () => `<div class="nb-row"><figure class="nb-stack"><span class="sb-h" data-h="a" role="img" aria-label="Hatched at 45 degrees"></span><figcaption class="nb-small">--nb-hatch-a (yours)</figcaption></figure>
    <figure class="nb-stack"><span class="sb-h" data-h="b" role="img" aria-label="Hatched at minus 45 degrees"></span><figcaption class="nb-small">--nb-hatch-b (theirs)</figcaption></figure>
    <figure class="nb-stack"><span class="sb-h" data-h="s" role="img" aria-label="Solid"></span><figcaption class="nb-small">Both: solid</figcaption></figure></div>
    <style>.sb-h{display:block;width:96px;height:96px;border-radius:var(--nb-radius-cell);box-shadow:inset 0 0 0 1.5px var(--nb-ink)}.sb-h[data-h=a]{background:var(--nb-hatch-a)}.sb-h[data-h=b]{background:var(--nb-hatch-b)}.sb-h[data-h=s]{background:var(--nb-ink)}</style>`,
};
