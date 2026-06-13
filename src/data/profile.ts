export const profile = {
  name: 'Muhammad Malik Fajar El-Syarif',
  shortName: 'MALIK',
  role: 'PPLG STUDENT',
  tagline: 'FULL STACK & AI ENGINEER',
  school: 'SMK Informatika Fithrah Insani',
  period: '2024 - Sekarang',
  location: 'Indonesia',
  goals: 'Full Stack Developer / AI Engineer / Cybersecurity',
  heroSummary:
    'Siswa SMK Informatika dengan fokus AI, web development, UI/UX design, dan problem solving. Target: masuk PSSN, PTN, atau PTS impian.',
  aboutQuote:
    'Saya Malik, siswa SMK Informatika dengan passion di bidang teknologi. Saya suka menciptakan solusi praktis melalui web development dan desain UI yang menarik.',
  missionStatement:
    'Fokus memperbaiki skill programming, belajar cybersecurity, dan mempersiapkan diri masuk PSSN (Politeknik Siber dan Sandi Negara) atau universitas seperti UIN, Itenas, ITB, Polban, atau Binus. Di luar coding, saya suka belajar matematika, membaca artikel tech, dan berkontribusi di project open source.',
  interests: ['Web Development', 'UI/UX Design', 'Cybersecurity', 'AI Engineer'],
  softSkills: ['Problem Solving', 'Critical Thinking', 'Self-Learning', 'Team Collaboration'],
  values: [
    'Cepat belajar teknologi baru',
    'Konsisten bikin project',
    'Kombinasi: Coding + Design + Security + AI',
  ],
  education: [
    { year: '2014-2016', school: 'TK Teratai Cigugur Tengah' },
    { year: '2016-2022', school: 'SD Tridaya Tunas Bangsa' },
    { year: '2022-2024', school: 'MTS Nurul Iman' },
    { year: '2024-Sekarang', school: 'SMK Informatika Fithrah Insani (PPLG)' },
  ],
  stats: { projects: '4+', skills: '12+', certificates: '3' },
};

export const skills = [
  { name: 'HTML & CSS', level: 90, category: 'PROGRAMMING' },
  { name: 'Python', level: 85, category: 'PROGRAMMING' },
  { name: 'JavaScript', level: 78, category: 'PROGRAMMING' },
  { name: 'SQL / Database', level: 75, category: 'PROGRAMMING' },
  { name: 'Node.js', level: 60, category: 'PROGRAMMING' },
  { name: 'JSON', level: 55, category: 'PROGRAMMING' },
  { name: 'TypeScript', level: 45, category: 'PROGRAMMING' },
  { name: 'PHP', level: 43, category: 'PROGRAMMING' },
  { name: 'React.js', level: 30, category: 'PROGRAMMING' },
  { name: 'C', level: 25, category: 'PROGRAMMING' },
  { name: 'C++', level: 21, category: 'PROGRAMMING' },
  { name: 'C#', level: 20, category: 'PROGRAMMING' },
] as const;

export const tools = [
  { name: 'Git & GitHub', desc: 'Branching, Collaboration' },
  { name: 'REST API', desc: 'API Development' },
  { name: 'MongoDB & MySQL', desc: 'Database Systems' },
  { name: 'Tailwind CSS', desc: 'Styling Framework' },
  { name: 'Express.js', desc: 'Backend Framework' },
  { name: 'Figma', desc: 'UI/UX Design' },
] as const;

export const currentLearning = [
  'Cybersecurity (Networking, Pentesting)',
  'Advanced JavaScript (Async, ES6+)',
  'UI/UX Design (Figma, Design System)',
  'Fisika (Persiapan PSSN & logic thinking)',
] as const;

export const projects = [
  {
    id: 1,
    title: 'WEBSITE KULINER DENGAN SISTEM AI',
    problem:
      'UMKM membutuhkan website dan AI untuk membantu usaha jualan mereka.',
    solution:
      'Web app dengan menu makanan, dashboard, serta sistem AI yang membantu mendeskripsikan menu secara otomatis.',
    tech: ['React.js', 'MySQL', 'Tailwind', 'CSS3'],
    role: 'Designer & Front-end',
    image: '/images/project-1.jpg',
    github: 'https://github.com/EpIteesTeams/KulinaAI',
    demo: 'https://kulinaai.biezz.my.id',
    status: 'COMPLETED',
  },
  {
    id: 2,
    title: 'PORTFOLIO GLASSMORPHISM',
    problem: 'Butuh portfolio website modern dengan desain kekinian.',
    solution:
      'Single-page portfolio dengan efek glassmorphism, animasi smooth, dan fully responsive.',
    tech: ['HTML5', 'CSS3', 'Vanilla JS'],
    role: 'All',
    image: '/images/project-2.jpg',
    github: 'https://github.com/Malikkun09/portofolio-glassmorphims-template',
    demo: 'https://portoglass.mlikfjr.my.id',
    status: 'COMPLETED',
  },
  {
    id: 3,
    title: 'API URL & API KEYS UNTUK BOT WHATSAPP DOWNLOADER',
    problem:
      'Butuh API untuk bot WhatsApp agar dapat mendownload video, audio, dan media dari berbagai platform.',
    solution:
      'API endpoint yang menyediakan URL download berbagai format media dengan sistem API keys untuk autentikasi.',
    tech: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    role: 'Backend Developer',
    image: '/images/project-3.jpg',
    github: 'https://github.com/Malikkun09/api-platform-sosmed-downloader-BETA-',
    demo: 'https://api.mlikfjr.my.id',
    status: 'COMPLETED',
  },
  {
    id: 4,
    title: 'CHATLIVE — REAL-TIME CHAT PLATFORM',
    problem:
      'Membangun platform komunikasi real-time yang scalable untuk banyak pengguna.',
    solution:
      'Real-time messaging, user authentication, rooms, media sharing — masih dikembangkan dan akan dilengkapi fitur lainnya.',
    tech: ['Node.js', 'Socket.io', 'MongoDB', 'React', 'WebSocket'],
    role: 'Full Stack Developer',
    image: '/images/project-4.jpg',
    github: 'https://github.com/Malikkun09/chatlive-BETA-',
    demo: 'https://chatlive.mlikfjr.my.id',
    status: 'IN_PROGRESS',
    statusNote: 'Dalam pengembangan — estimasi beberapa bulan lagi untuk menyelesaikan proyek ini.',
    featured: true,
  },
] as const;

export const experiences = [
  {
    title: 'BPJS HACKATHON',
    period: '2024',
    summary: '1 tim (3 orang), ±1 bulan membuat solusi digital untuk masalah UMKM.',
    description:
      'Hackathon yang diselenggarakan oleh BPJS Kesehatan dengan fokus solusi digital untuk UMKM.',
    highlights: ['Tim 3 orang', 'Solusi digital UMKM', 'Eksekusi dalam 1 bulan'],
    color: 'neon',
  },
  {
    title: 'PROJECT KOLABORASI ONLINE',
    period: '2024-2025',
    summary:
      'Bekerja sama dengan developer mahasiswa universitas lain via GitHub.',
    description:
      'Berkontribusi di project open source kecil-kecilan, belajar workflow tim dan code review.',
    highlights: ['Kolaborasi via GitHub', 'Open source', 'Code review tim'],
    color: 'holo',
  },
  {
    title: 'API (APPLICATION PROGRAMMING INTERFACE)',
    period: '2024-2025',
    summary: 'Membuat API dengan JavaScript serta Node.js.',
    description:
      'Membuat RESTful API dengan Node.js dan Express untuk layanan pemendek URL dan sistem autentikasi.',
    highlights: ['RESTful API', 'Node.js & Express', 'Autentikasi & URL shortener'],
    color: 'cyber',
  },
] as const;

export const certificates = [
  {
    name: 'Introduction to Financial Literacy',
    issuer: 'Dicoding',
    type: 'Sertifikat Kelulusan',
    date: 'Jan 2026',
    description:
      'Menunjukkan pemahaman dasar literasi keuangan dan komitmen menyelesaikan pembelajaran terstruktur.',
  },
  {
    name: 'Imphnen x Kolosal — Lomba Hackathon',
    issuer: 'Imphnen',
    type: 'Sertifikat Partisipasi Lomba Hackathon',
    date: 'Okt - Nov 2025',
    description:
      'Mengikuti dan berpartisipasi dalam lomba hackathon bertema "Website untuk UMKM Menggunakan AI".',
  },
  {
    name: 'Imphnen — Lomba Hackathon 2',
    issuer: 'Imphnen',
    type: 'Sertifikat Partisipasi Lomba Hackathon',
    date: 'Des 2025',
    description:
      'Mengikuti dan berpartisipasi dalam lomba hackathon bertema "Website untuk UMKM".',
  },
] as const;

export const goals = {
  short: ['Menguasai Full Stack Development', 'Membangun portfolio impactful'],
  mid: ['Masuk PSSN / PTN / PTS (Polban, ITB, Binus)', 'Mendalami Cybersecurity & AI'],
  long: ['Menjadi AI / Cybersecurity Engineer', 'Membangun produk teknologi sendiri'],
} as const;

export const contacts = [
  {
    icon: 'mail',
    label: 'EMAIL',
    value: 'malikacconlyone@gmail.com',
    href: 'mailto:malikacconlyone@gmail.com',
  },
  {
    icon: 'github',
    label: 'GITHUB',
    value: 'Malikkun09',
    href: 'https://github.com/Malikkun09',
  },
  {
    icon: 'linkedin',
    label: 'LINKEDIN',
    value: 'Muhammad Malik Fajar',
    href: 'https://www.linkedin.com/in/muhammad-malik-fajar-el-syarif-05773a392/',
  },
  {
    icon: 'whatsapp',
    label: 'WHATSAPP',
    value: '+62 889-1983-723',
    href: 'https://wa.me/628891983723',
  },
  {
    icon: 'globe',
    label: 'WEBSITE',
    value: 'malikfajar.me',
    href: 'https://malikfajar.me',
  },
] as const;

export const socialLinks = {
  github: 'https://github.com/Malikkun09',
  linkedin: 'https://www.linkedin.com/in/muhammad-malik-fajar-el-syarif-05773a392/',
  website: 'https://malikfajar.me',
  email: 'mailto:malikacconlyone@gmail.com',
};
