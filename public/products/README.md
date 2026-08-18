# Mercado Futbol product images

Place finished jersey photos in this folder using simple lowercase filenames, for example:

- `inter-miami-away-2025.jpg`
- `real-madrid-home-2026.jpg`
- `barcelona-home-2026.jpg`

Then add the public path to the matching product in `lib/catalog.ts`:

```ts
image: "/products/inter-miami-away-2025.jpg"
```

Recommended image format: JPG or WebP, square canvas, at least 1200 x 1200 pixels, plain background, and under 1.5 MB per image.
