'use client'
import { Typewriter } from 'react-simple-typewriter'

export default function RoleTypewriter() {
  return (
    <Typewriter
      words={['Full-Stack Developer', 'Self-Taught Builder', 'React · Node · TypeScript']}
      loop={0}
      cursor={false}
      typeSpeed={50}
      deleteSpeed={25}
      delaySpeed={2200}
    />
  )
}
