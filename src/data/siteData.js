export const SECTIONS = [
  { id: "home", shape: "torusKnot", color: "#5ec8b8", ring: true },
  { id: "projects", shape: "icosahedron", color: "#e8925f", ring: false },
  { id: "about", shape: "dodecahedron", color: "#a98ce8", ring: true },
  { id: "contact", shape: "octahedron", color: "#e8c46a", ring: false },
];

export const translations = {
  pt: {
    nav: {
      home: "Início",
      projects: "Projetos",
      about: "Sobre",
      contact: "Contacto",
    },
    hero: {
      greeting: "Olá, eu sou",
      name: "João Pereira",
      role: "Engenheiro de Software & Investigador",
      intro:
        "Mestrando em cibersegurança e sistemas distribuídos no IST. Investigo sistemas de gestão de chaves no INESC-ID e tenho um grande interesse em motores de jogos.",
      cta: "Ver projetos",
    },
    projects: {
      title: "Projetos",
      subtitle: "Uma seleção de coisas que construí",
      items: [
        {
          name: "OGL-Game-Engine",
          desc: "Motor de jogos 3D em C++ e OpenGL moderno. Iluminação Blinn-Phong, materiais, texturas, efeitos de partículas e scenegraph hierárquico.",
          tags: ["C++", "OpenGL", "3D"],
          link: "https://github.com/GalaxyCrush/OGL-Game-Engine",
        },
        {
          name: "DepChain",
          desc: "Plataforma blockchain distribuída com consenso bizantino, camadas de rede personalizadas, integração de smart contracts e autenticação criptográfica. (Nota: 19.5/20)",
          tags: ["Java", "Blockchain", "Consensus"],
          link: "https://github.com/GalaxyCrush/DepChain",
        },
        {
          name: "MessagIST",
          desc: "Aplicação de mensagens com encriptação ponta a ponta em Java, Spring Boot e PostgreSQL: canais SSL/TLS, criptografia assimétrica, hashing salgado e fila de mensagens offline. (Nota: 18/20)",
          tags: ["Java", "Spring", "Security"],
          link: "https://github.com/GalaxyCrush/MessagIST",
        },
        {
          name: "Particle-Simulator",
          desc: "Simulador 2D de colisão de partículas em C++ com estratégias de paralelização serial, OpenMP e MPI.",
          tags: ["C++", "OpenMP", "MPI"],
          link: "https://github.com/GalaxyCrush/Particle-Simulator",
        },
        {
          name: "Dida-Meetings",
          desc: "Aplicação distribuída tolerante a falhas que implementa o algoritmo de consenso Vertical multi-Paxos em Java, com gRPC e gestão concorrente de reuniões. (Nota: 17.75/20)",
          tags: ["Java", "Paxos", "gRPC"],
          link: "https://github.com/GalaxyCrush/Dida-Meetings",
        },
        {
          name: "Lisboa-Chat",
          desc: "Aplicação de mensagens instantâneas escalável com microserviços: FastAPI, React/TypeScript, WebSockets, PostgreSQL, Redis, Docker, Kubernetes e deploy no GCP com Terraform e Ansible. (Nota: 20/20)",
          tags: ["Python", "React", "Kubernetes"],
          link: "https://github.com/GalaxyCrush/Lisboa-Chat",
        },
        {
          name: "UnnamedMineMod",
          desc: "Um mod para Minecraft criado para aprender e explorar conceitos de modding.",
          tags: ["Java", "Minecraft", "Modding"],
          link: "https://github.com/GalaxyCrush/UnnamedMineMod",
        },
        {
          name: "CTFs-writups",
          desc: "Writeups e scripts usados para resolver CTFs (Capture The Flag).",
          tags: ["Security", "CTF", "Python"],
          link: "https://github.com/GalaxyCrush/CTFs-writups",
        },
        {
          name: "static-analysis-tool",
          desc: "Ferramenta de análise estática em Python para deteção de vulnerabilidades de segurança web. Implementa análise de taint para identificar fluxos de dados não sanitizados entre fontes não confiáveis e sinks sensíveis. (Nota: 19.26/20)",
          tags: ["Python", "Security", "Static Analysis"],
          link: "https://github.com/GalaxyCrush/static-analysis-tool",
        },
        {
          name: "Games-at-cloud",
          desc: "Sistema desenhado para executar tarefas computacionalmente intensivas inspiradas em jogos simples.",
          tags: ["Python", "Cloud"],
          link: "https://github.com/GalaxyCrush/Games-at-cloud",
        },
        {
          name: "ThyroidSupervisedModel",
          desc: "Modelo de aprendizagem supervisionada para classificação da tiroide.",
          tags: ["Python", "Machine Learning"],
          link: "https://github.com/GalaxyCrush/ThyroidSupervisedModel",
        },
      ],
    },
    about: {
      title: "Sobre mim",
      p1: "Sou estudante de Engenharia Informática e sempre sonhei em ser engenheiro de software. Estou a tirar mestrado em cibersegurança e sistemas distribuídos no IST e, como investigador no INESC-ID, desenho um sistema de gestão de chaves (KMS) seguro e resiliente para ambientes governamentais, em colaboração com o Gabinete Nacional de Segurança (GNS).",
      p2: "Recentemente interessei-me por arquiteturas de home-server e quero aprender mais sobre elas. Também colaboro na equipa de gráficos do motor de jogos CUBOS (Game Dev Técnico). No tempo livre, vejo anime, jogo, leio e ouço música.",
      p3: "O meu objetivo é crescer como engenheiro de software — na cibersegurança e no desenvolvimento de software — e estou sempre aberto a aprender novas competências que ajudem nesse caminho.",
      skillsLabel: "Competências",
      skillGroups: [
        {
          label: "Linguagens",
          items: ["Java", "C", "C++", "Python", "JavaScript", "C#"],
        },
        { label: "Backend", items: ["FastAPI", "Spring", "Hono"] },
        { label: "Frontend", items: ["HTML", "CSS", "React", "Vite"] },
        {
          label: "Bases de Dados",
          items: ["PostgreSQL", "MongoDB"],
        },
        {
          label: "Cloud & DevOps",
          items: ["Docker", "Kubernetes", "AWS", "GCP", "Ansible", "Terraform"],
        },
        {
          label: "Soft Skills",
          items: ["Trabalho de equipa", "Adaptabilidade", "Motivação", "Escuta ativa"],
        },
      ],
      languagesLabel: "Idiomas",
      languages: ["Português", "Espanhol", "Inglês"],
    },
    contact: {
      title: "Contacto",
      subtitle: "Tens um projeto em mente? Fala comigo.",
      emailLabel: "Escreve-me para",
      email: "joaomrpereira0@gmail.com",
      socials: [
        { label: "GitHub", url: "https://github.com/GalaxyCrush" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/jo%C3%A3o-pereira-bb9147273/" },
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I am",
      name: "João Pereira",
      role: "Software Engineer & Researcher",
      intro:
        "Master's student in cybersecurity and distributed systems at IST. I research Key Management Systems at INESC-ID and I'm deeply interested in game engines.",
      cta: "View projects",
    },
    projects: {
      title: "Projects",
      subtitle: "A selection of things I have built",
      items: [
        {
          name: "OGL-Game-Engine",
          desc: "3D game engine built with C++ and modern OpenGL. Blinn-Phong lighting, materials, textures, particle effects, and a hierarchical scenegraph.",
          tags: ["C++", "OpenGL", "3D"],
          link: "https://github.com/GalaxyCrush/OGL-Game-Engine",
        },
        {
          name: "DepChain",
          desc: "A distributed blockchain platform with Byzantine consensus, custom network layers, smart contract integration, and cryptographic authentication. (Grade: 19.5/20)",
          tags: ["Java", "Blockchain", "Consensus"],
          link: "https://github.com/GalaxyCrush/DepChain",
        },
        {
          name: "MessagIST",
          desc: "Secure end-to-end encrypted messaging application built with Java, Spring Boot, and PostgreSQL: SSL/TLS channels, asymmetric cryptography, salted hashing, and offline message queuing. (Grade: 18/20)",
          tags: ["Java", "Spring", "Security"],
          link: "https://github.com/GalaxyCrush/MessagIST",
        },
        {
          name: "Particle-Simulator",
          desc: "2D particle collision simulator in C++ with serial, OpenMP, and MPI parallelization strategies.",
          tags: ["C++", "OpenMP", "MPI"],
          link: "https://github.com/GalaxyCrush/Particle-Simulator",
        },
        {
          name: "Dida-Meetings",
          desc: "Fault-tolerant distributed application implementing the Vertical multi-Paxos consensus algorithm in Java, using gRPC and concurrent meeting management across nodes. (Grade: 17.75/20)",
          tags: ["Java", "Paxos", "gRPC"],
          link: "https://github.com/GalaxyCrush/Dida-Meetings",
        },
        {
          name: "Lisboa-Chat",
          desc: "Scalable instant messaging app built with microservices: FastAPI, React/TypeScript, WebSockets, PostgreSQL, Redis, Docker, Kubernetes, and GCP deployment with Terraform and Ansible. (Grade: 20/20)",
          tags: ["Python", "React", "Kubernetes"],
          link: "https://github.com/GalaxyCrush/Lisboa-Chat",
        },
        {
          name: "UnnamedMineMod",
          desc: "A Minecraft mod created to learn and explore modding concepts.",
          tags: ["Java", "Minecraft", "Modding"],
          link: "https://github.com/GalaxyCrush/UnnamedMineMod",
        },
        {
          name: "CTFs-writups",
          desc: "Writeups and scripts used to solve CTFs (Capture The Flag).",
          tags: ["Security", "CTF", "Python"],
          link: "https://github.com/GalaxyCrush/CTFs-writups",
        },
        {
          name: "static-analysis-tool",
          desc: "Python static analysis tool for web security vulnerability detection. Implements taint analysis to identify unsanitized data flows between untrusted sources and sensitive sinks. (Grade: 19.26/20)",
          tags: ["Python", "Security", "Static Analysis"],
          link: "https://github.com/GalaxyCrush/static-analysis-tool",
        },
        {
          name: "Games-at-cloud",
          desc: "System designed to run computationally-intensive tasks inspired by simple games.",
          tags: ["Python", "Cloud"],
          link: "https://github.com/GalaxyCrush/Games-at-cloud",
        },
        {
          name: "ThyroidSupervisedModel",
          desc: "A supervised learning model for thyroid classification.",
          tags: ["Python", "Machine Learning"],
          link: "https://github.com/GalaxyCrush/ThyroidSupervisedModel",
        },
      ],
    },
    about: {
      title: "About me",
      p1: "I'm a software engineering student who has always dreamed of being one. I'm pursuing a master's in cybersecurity and distributed systems at IST and, as a research assistant at INESC-ID, I design a secure and resilient Key Management System (KMS) for governmental environments, in collaboration with the Portuguese National Security Office (GNS).",
      p2: "I've recently become very interested in home-server architectures and want to learn more about them. I also contribute to the graphics team of the CUBOS game engine (Game Dev Técnico). In my free time, I enjoy watching anime, playing games, reading, and listening to music.",
      p3: "My goal is to grow as a software engineer — in cybersecurity and software development — and I'm always open to learning new skills that will help me on my journey.",
      skillsLabel: "Skills",
      skillGroups: [
        {
          label: "Languages",
          items: ["Java", "C", "C++", "Python", "JavaScript", "C#"],
        },
        { label: "Backend", items: ["FastAPI", "Spring", "Hono"] },
        { label: "Frontend", items: ["HTML", "CSS", "React", "Vite"] },
        {
          label: "Databases",
          items: ["PostgreSQL", "MongoDB"],
        },
        {
          label: "Cloud & DevOps",
          items: ["Docker", "Kubernetes", "AWS", "GCP", "Ansible", "Terraform"],
        },
        {
          label: "Soft Skills",
          items: ["Teamwork", "Adaptability", "Motivation", "Active listening"],
        },
      ],
      languagesLabel: "Spoken languages",
      languages: ["Portuguese", "Spanish", "English"],
    },
    contact: {
      title: "Contact",
      subtitle: "Have a project in mind? Let's talk.",
      emailLabel: "Write me at",
      email: "joaomrpereira0@gmail.com",
      socials: [
        { label: "GitHub", url: "https://github.com/GalaxyCrush" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/jo%C3%A3o-pereira-bb9147273/" },
      ],
    },
  },
};
