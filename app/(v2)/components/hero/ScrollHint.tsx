export default function ScrollHint() {
  return (
    <div
      className="absolute right-12 bottom-10 flex flex-col items-center gap-3 z-10 hidden sm:flex"
      aria-hidden="true"
    >
      <span className="text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground [writing-mode:vertical-rl]">
        Scroll
      </span>
      <div
        className="w-px h-14 [background:linear-gradient(to_bottom,hsl(var(--muted-foreground)_/_0.5),transparent)] [animation:v2-line-drop_1.6s_ease-in-out_infinite] [transform-origin:top]"
      />
    </div>
  )
}
