export type CardTone =
  | 'yellow'
  | 'white'
  | 'black'
  | 'green'
  | 'slate'
  | 'blue'
  | 'lime'
  | 'gradient'
  | 'figma'
  | 'red'
  | 'maroon'
  | 'indigo'

export type CardSide = {
  title: string
  eyebrow: string
  label: string
  tone: CardTone
  mark?: string
}

export type ToolkitCard = {
  id: string
  front: CardSide
  back: CardSide
}

// Skills from Manaal's CV (ManaalMaple_0_1n19.pdf).
// First spin (fronts): technical skills.
// Second spin (backs): soft skills, drawn from his leadership work
// (Technical Lead, team of 12 on the college website redesign, hackathon
// organiser, presenting findings to evaluators).
// The reverse order intentionally makes the edge-on turn land on the first
// soft skill first, then opens into the rest of the fan.
export const toolkitCards: ToolkitCard[] = [
  {
    id: 'typescript',
    front: { title: 'Type\nscript', eyebrow: '01 / language', label: 'Language', tone: 'yellow' },
    back: { title: 'Presenting', eyebrow: '08 / soft skill', label: 'Soft skill', tone: 'gradient' },
  },
  {
    id: 'javascript',
    front: { title: 'Java\nscript', eyebrow: '02 / language', label: 'Language', tone: 'white' },
    back: { title: 'Adaptability', eyebrow: '07 / soft skill', label: 'Soft skill', tone: 'slate' },
  },
  {
    id: 'python',
    front: { title: 'Python', eyebrow: '03 / language', label: 'Language', tone: 'black' },
    back: { title: 'Time\nManagement', eyebrow: '06 / soft skill', label: 'Soft skill', tone: 'red' },
  },
  {
    id: 'sql',
    front: { title: 'SQL', eyebrow: '04 / data', label: 'Database', tone: 'black' },
    back: { title: 'Project\nManagement', eyebrow: '05 / soft skill', label: 'Soft skill', tone: 'maroon' },
  },
  {
    id: 'nextjs',
    front: { title: 'Next.js', eyebrow: '05 / framework', label: 'Framework', tone: 'green' },
    back: { title: 'Problem\nsolving', eyebrow: '04 / soft skill', label: 'Soft skill', tone: 'indigo' },
  },
  {
    id: 'react',
    front: { title: 'React', eyebrow: '06 / framework', label: 'Framework', tone: 'slate' },
    back: { title: 'Teamwork', eyebrow: '03 / soft skill', label: 'Soft skill', tone: 'white' },
  },
  {
    id: 'supabase',
    front: { title: 'Supa\nbase', eyebrow: '07 / backend', label: 'Backend', tone: 'white' },
    back: { title: 'Communication', eyebrow: '02 / soft skill', label: 'Soft skill', tone: 'blue' },
  },
  {
    id: 'tailwind',
    front: { title: 'Tail\nwind', eyebrow: '08 / styling', label: 'CSS framework', tone: 'lime' },
    back: { title: 'Leadership', eyebrow: '01 / soft skill', label: 'Soft skill', tone: 'figma' },
  },
]

export const frontFanOrder = toolkitCards.map((card) => card.id)
export const backFanOrder = [...toolkitCards].reverse().map((card) => card.id)
