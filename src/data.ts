export const siteConfig = {
  name: 'SMIT', role: 'Software Engineer', email: 'smitbharshankar110@gmail.com',
  github: 'https://github.com/Smit-Bharshankar',
  linkedin: 'https://linkedin.com/in/smit-bharshankar',
  AISaas : 'https://github.com/Smit-Bharshankar/AI-Resume-Ranker'
}

export const projects = [
  {
    number: '01',
    title: 'Sortres',
    category: 'AI RECRUITMENT SAAS',
    description:
      'An AI-powered recruitment platform that transforms job descriptions and resumes into structured candidate insights, scoring, and recruiter-ready recommendations.',
    technologies: ['React', 'Node.js', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'Gemini AI'],
    gradient: 'violet',
    // Save your landing-page thumbnail at public/images/sortres-thumbnail.webp.
    // It will automatically render inside the MacBook mockup.
    image: '/images/sortres-thumbnail.webp',
    videoEmbed: "https://youtu.be/TOcQavoA5jQ",
  },
]

export const skillGroups = [
  ['Frontend', 'React', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Tailwind'],
  ['Backend', 'Node.js', 'Express', 'REST APIs', 'Authentication'],
  ['Database', 'MongoDB', 'PostgreSQL', 'Schema Design', 'Storage Bucket'],
  ['Tooling', 'Git', 'Docker', 'CI / CD' , 'AI APIs', 'Flutter'],
]
