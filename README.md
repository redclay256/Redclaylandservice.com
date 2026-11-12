# Red Clay Land Service — Website Source

Plain static site (HTML, CSS, JavaScript, images). No build step or framework.

## Contents
```
src/
  index.html, about.html, faq.html, intake.html
  forestry-mulching.html, brush-clearing.html, fire-mitigation.html, right-of-way-clearing.html
  madison.html, meridianville.html, gurley.html, hazel-green.html, new-market.html, owens-cross-roads.html
  css/style.css      all styling
  js/main.js         menu, interactions
  images/            logo, hero, gallery photos
  robots.txt, sitemap.xml
```

## 1. Extract
- Windows: right-click the ZIP > Extract All.
- Mac: double-click the ZIP.
- Linux: `unzip redclaylandservice-source.zip`

## 2. Edit
1. Install a free editor such as VS Code (code.visualstudio.com).
2. Open the `src` folder (File > Open Folder).
3. Text and content: edit the `.html` files. Each page is its own file.
4. Colors, fonts, layout: edit `css/style.css`.
5. Photos: replace files in `images/` using the same file names, or update the `src="images/..."` paths.
6. Phone/email appear as `tel:2565139076`, `sms:2565139076` and `mailto:lr@redclaylandservice.com`. Search all files (Ctrl/Cmd+Shift+F) to change them everywhere.
7. If you add or rename pages, update the navigation in every page and `sitemap.xml`.

## 3. Preview locally
Opening `src/index.html` in a browser works for most things. For an accurate preview, run a local server from the `src` folder:
- Python: `python3 -m http.server 8000` then visit http://localhost:8000
- Node: `npx serve .`
- VS Code: install the "Live Server" extension and click "Go Live".

## 4. Host it
Upload the contents of `src` (index.html must be at the top level).

- **Vercel (current host, project "redclay")**: install the CLI (`npm i -g vercel`), run `vercel --prod` inside `src`, and link to the existing `redclay` project in the Red Clay team so the redclaylandservice.com domain stays attached. Or connect a GitHub repo in the Vercel dashboard so each push deploys automatically.
- **Netlify**: drag the `src` folder onto app.netlify.com/drop.
- **GitHub Pages**: push the contents of `src` to a repo, then Settings > Pages > deploy from the main branch.
- **Cloudflare Pages / any web host**: upload the files via the dashboard or FTP to the public web root.

To use your domain with a new host, add it in that host's domain settings and update DNS records at your registrar as instructed.

## Notes on this export
- Recovered from the Vercel project `redclay` (team Red Clay) on Nov 12, 2026.
- The current live deployment (Jul 20, 2026) contained only 6 files: index, about, intake, forestry-mulching, style.css and main.js. Those newest versions are included here.
- The other 13 pages, all images, robots.txt and sitemap.xml were missing from that deployment and currently return 404 on the live site. They were restored from the previous deployment (Jul 9, 2026). Redeploying this full folder fixes the broken images and links.
- The GitHub repo redclay256/Redclaylandservice.com is currently empty.
