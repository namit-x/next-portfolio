export default function ScrollHint() {
  return (
    <div
      className="absolute right-3 sm:right-6 md:right-12 bottom-6 sm:bottom-8 md:bottom-10 flex flex-col items-center gap-2 md:gap-3 z-10 hidden md:flex"
      aria-hidden="true"
    >
      <span className="text-[9px] md:text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground [writing-mode:vertical-rl]">
        Scroll
      </span>
      <div
        className="w-px h-10 md:h-14 [background:linear-gradient(to_bottom,hsl(var(--muted-foreground)_/_0.5),transparent)] [animation:v2-line-drop_1.6s_ease-in-out_infinite] [transform-origin:top]"
      />
    </div>
  )
}
