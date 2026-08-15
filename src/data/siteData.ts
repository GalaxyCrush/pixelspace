export type Lang = "pt" | "en";

export interface SectionConfig {
  id: string;
  shape: string;
  color: string;
  ring: boolean;
  size?: number;
}

export interface ProjectItem {
  name: string;
  desc: string;
  tags: string[];
  link: string;
  details: string;
  highlights: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  place: string;
  desc: string;
}

export interface Social {
  label: string;
  url: string;
}

export interface Translation {
  nav: { home: string; projects: string; about: string; contact: string };
  hero: { greeting: string; name: string; role: string; intro: string; cta: string };
  projects: {
    title: string;
    subtitle: string;
    detailsLabel: string;
    closeLabel: string;
    items: ProjectItem[];
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    skillsLabel: string;
    skillGroups: SkillGroup[];
    languagesLabel: string;
    languages: string[];
    timelineLabel: string;
    timeline: TimelineEntry[];
  };
  contact: {
    title: string;
    subtitle: string;
    emailLabel: string;
    email: string;
    socials: Social[];
    cvLabel: string;
    cvUrl: string;
  };
}

export const SECTIONS: SectionConfig[] = [
  { id: "home", shape: "torusKnot", color: "#5ec8b8", ring: true },
  { id: "projects", shape: "icosahedron", color: "#e8925f", ring: false },
  { id: "about", shape: "dodecahedron", color: "#a98ce8", ring: true },
  { id: "contact", shape: "octahedron", color: "#e8c46a", ring: false },
];

export const translations: Record<Lang, Translation> = {
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
      role: "Engenheiro de Software",
      intro:
        "Mestrando em cibersegurança e sistemas distribuídos no IST. Investigo sistemas de gestão de chaves no INESC-ID e tenho um grande interesse em motores de jogos.",
      cta: "Ver projetos",
    },
    projects: {
      title: "Projetos",
      subtitle: "Uma seleção de coisas que construí",
      detailsLabel: "Detalhes",
      closeLabel: "Fechar",
      items: [
        {
          name: "OGL-Game-Engine",
          desc: "Motor de jogos 3D em C++ e OpenGL moderno. Iluminação Blinn-Phong, materiais, texturas, efeitos de partículas e scenegraph hierárquico.",
          tags: ["C++", "OpenGL", "3D"],
          link: "https://github.com/GalaxyCrush/OGL-Game-Engine",
          details:
            "Motor de jogos 3D construído de raiz em C++ com OpenGL moderno, com o objetivo de perceber a arquitetura e o pipeline de rendering por trás de um motor de jogos.",
          highlights: [
            "Iluminação Blinn-Phong e materiais",
            "Texturas e efeitos de partículas",
            "Scenegraph hierárquico",
          ],
        },
        {
          name: "DepChain",
          desc: "Plataforma blockchain distribuída com consenso bizantino, camadas de rede personalizadas, integração de smart contracts e autenticação criptográfica. (Nota: 19.5/20)",
          tags: ["Java", "Blockchain", "Consensus"],
          link: "https://github.com/GalaxyCrush/DepChain",
          details:
            "Plataforma blockchain distribuída com foco em consenso bizantino e redes resilientes, incluindo camadas de rede próprias, integração de smart contracts e autenticação criptográfica. Nota: 19.5/20.",
          highlights: [
            "Consenso bizantino",
            "Camadas de rede personalizadas",
            "Smart contracts e autenticação criptográfica",
          ],
        },
        {
          name: "MessagIST",
          desc: "Aplicação de mensagens com encriptação ponta a ponta em Java, Spring Boot e PostgreSQL: canais SSL/TLS, criptografia assimétrica, hashing salgado e fila de mensagens offline. (Nota: 18/20)",
          tags: ["Java", "Spring", "Security"],
          link: "https://github.com/GalaxyCrush/MessagIST",
          details:
            "Aplicação de mensagens segura com encriptação ponta a ponta: canais SSL/TLS, criptografia assimétrica, hashing salgado e fila de mensagens offline. Nota: 18/20.",
          highlights: [
            "Canais SSL/TLS",
            "Criptografia assimétrica",
            "Fila de mensagens offline",
          ],
        },
        {
          name: "Particle-Simulator",
          desc: "Simulador 2D de colisão de partículas em C++ com estratégias de paralelização serial, OpenMP e MPI.",
          tags: ["C++", "OpenMP", "MPI"],
          link: "https://github.com/GalaxyCrush/Particle-Simulator",
          details:
            "Simulador 2D de colisões de partículas em C++ que compara estratégias de paralelização para otimizar a simulação.",
          highlights: [
            "Estratégias serial, OpenMP e MPI",
            "Otimização de desempenho",
          ],
        },
        {
          name: "Dida-Meetings",
          desc: "Aplicação distribuída tolerante a falhas que implementa o algoritmo de consenso Vertical multi-Paxos em Java, com gRPC e gestão concorrente de reuniões. (Nota: 17.75/20)",
          tags: ["Java", "Paxos", "gRPC"],
          link: "https://github.com/GalaxyCrush/Dida-Meetings",
          details:
            "Aplicação distribuída tolerante a falhas que implementa o algoritmo de consenso Vertical multi-Paxos, com gRPC e gestão concorrente de reuniões entre nós. Nota: 17.75/20.",
          highlights: [
            "Consenso Vertical multi-Paxos",
            "Comunicação gRPC",
            "Tolerância a falhas",
          ],
        },
        {
          name: "Lisboa-Chat",
          desc: "Aplicação de mensagens instantâneas escalável com microserviços: FastAPI, React/TypeScript, WebSockets, PostgreSQL, Redis, Docker, Kubernetes e deploy no GCP com Terraform e Ansible. (Nota: 20/20)",
          tags: ["Python", "React", "Kubernetes"],
          link: "https://github.com/GalaxyCrush/Lisboa-Chat",
          details:
            "Aplicação de mensagens instantâneas escalável construída com microserviços, com deploy completo em cloud. Nota: 20/20.",
          highlights: [
            "FastAPI, React/TypeScript e WebSockets",
            "PostgreSQL e Redis",
            "Kubernetes no GCP com Terraform e Ansible",
          ],
        },
        {
          name: "UnnamedMineMod",
          desc: "Um mod para Minecraft criado para aprender e explorar conceitos de modding.",
          tags: ["Java", "Minecraft", "Modding"],
          link: "https://github.com/GalaxyCrush/UnnamedMineMod",
          details:
            "Mod para Minecraft criado para aprender e explorar conceitos de modding, desde o ambiente de desenvolvimento até à implementação de conteúdo personalizado.",
          highlights: ["Modding em Java", "Conteúdo personalizado"],
        },
        {
          name: "CTFs-writups",
          desc: "Writeups e scripts usados para resolver CTFs (Capture The Flag).",
          tags: ["Security", "CTF", "Python"],
          link: "https://github.com/GalaxyCrush/CTFs-writups",
          details:
            "Writeups e scripts usados para resolver desafios de CTF, documentando o processo de pensamento e as técnicas aplicadas.",
          highlights: ["Writeups detalhados", "Scripts de resolução", "Técnicas de segurança"],
        },
        {
          name: "static-analysis-tool",
          desc: "Ferramenta de análise estática em Python para deteção de vulnerabilidades de segurança web. Implementa análise de taint para identificar fluxos de dados não sanitizados entre fontes não confiáveis e sinks sensíveis. (Nota: 19.26/20)",
          tags: ["Python", "Security", "Static Analysis"],
          link: "https://github.com/GalaxyCrush/static-analysis-tool",
          details:
            "Ferramenta de análise estática em Python que implementa análise de taint para detetar vulnerabilidades web, rastreando fluxos de dados não sanitizados. Nota: 19.26/20.",
          highlights: [
            "Análise de taint",
            "Deteção de vulnerabilidades web",
            "Fontes não confiáveis e sinks sensíveis",
          ],
        },
        {
          name: "Games-at-cloud",
          desc: "Sistema desenhado para executar tarefas computacionalmente intensivas inspiradas em jogos simples.",
          tags: ["Python", "Cloud"],
          link: "https://github.com/GalaxyCrush/Games-at-cloud",
          details:
            "Sistema desenhado para executar tarefas computacionalmente intensivas inspiradas em jogos simples, explorando conceitos de computação em cloud.",
          highlights: ["Computação distribuída", "Python"],
        },
        {
          name: "ThyroidSupervisedModel",
          desc: "Modelo de aprendizagem supervisionada para classificação da tiroide.",
          tags: ["Python", "Machine Learning"],
          link: "https://github.com/GalaxyCrush/ThyroidSupervisedModel",
          details:
            "Modelo de aprendizagem supervisionada para classificação da tiroide, com exploração de dados e avaliação de métricas.",
          highlights: ["Aprendizagem supervisionada", "Classificação", "Análise de métricas"],
        },
      ],
    },
    about: {
      title: "Sobre mim",
      p1: "Sou um rapaz que adora jogos e que sempre teve interesse na tecnologia.",
      p2: "Atualmente sou um C++ software engineer e gosto de fazer software nos meus tempos livres, ler livros, ouvir música, ver anime e, claramente, jogar jogos.",
      p3: "Atualmente estou a acabar o mestrado em cibersegurança e sistemas distribuídos no IST, com investigação em sistemas de gestão de chaves (KMS) no INESC-ID, em colaboração com o Gabinete Nacional de Segurança (GNS).",
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
      timelineLabel: "Trajetória",
      timeline: [
        {
          period: "Out 2025 — Presente",
          title: "Investigador (Research Assistant)",
          place: "INESC-ID · KMS em colaboração com o GNS",
          desc: "Desenho um sistema de gestão de chaves (KMS) seguro e resiliente para ambientes governamentais, no âmbito da tese de mestrado.",
        },
        {
          period: "2025 — Presente",
          title: "Mestrado em Cibersegurança e Sistemas Distribuídos",
          place: "Instituto Superior Técnico (IST)",
          desc: "Foco em sistemas distribuídos, criptografia aplicada e segurança de sistemas.",
        },
        {
          period: "Out 2024 — Fev 2026",
          title: "Game Dev Técnico · Colaborador",
          place: "CUBOS Game Engine · Equipa de Gráficos",
          desc: "Contribuição na equipa de gráficos de um motor de jogos minimalista focado em voxels e programação orientada a dados (C++).",
        },
        {
          period: "2021 — 2024",
          title: "Licenciatura em Engenharia Informática",
          place: "Faculdade de Ciências da Universidade de Lisboa (FCUL)",
          desc: "Média de 16/20.",
        },
      ],
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
      cvLabel: "Download CV",
      cvUrl: "",
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
      role: "Software Engineer",
      intro:
        "Master's student in cybersecurity and distributed systems at IST. I research Key Management Systems at INESC-ID and I'm deeply interested in game engines.",
      cta: "View projects",
    },
    projects: {
      title: "Projects",
      subtitle: "A selection of things I have built",
      detailsLabel: "Details",
      closeLabel: "Close",
      items: [
        {
          name: "OGL-Game-Engine",
          desc: "3D game engine built with C++ and modern OpenGL. Blinn-Phong lighting, materials, textures, particle effects, and a hierarchical scenegraph.",
          tags: ["C++", "OpenGL", "3D"],
          link: "https://github.com/GalaxyCrush/OGL-Game-Engine",
          details:
            "A 3D game engine built from scratch in C++ with modern OpenGL, aimed at understanding the architecture and rendering pipeline behind a game engine.",
          highlights: [
            "Blinn-Phong lighting and materials",
            "Textures and particle effects",
            "Hierarchical scenegraph",
          ],
        },
        {
          name: "DepChain",
          desc: "A distributed blockchain platform with Byzantine consensus, custom network layers, smart contract integration, and cryptographic authentication. (Grade: 19.5/20)",
          tags: ["Java", "Blockchain", "Consensus"],
          link: "https://github.com/GalaxyCrush/DepChain",
          details:
            "A distributed blockchain platform focused on Byzantine consensus and resilient networking, including custom network layers, smart contract integration, and cryptographic authentication. Grade: 19.5/20.",
          highlights: [
            "Byzantine consensus",
            "Custom network layers",
            "Smart contracts and cryptographic authentication",
          ],
        },
        {
          name: "MessagIST",
          desc: "Secure end-to-end encrypted messaging application built with Java, Spring Boot, and PostgreSQL: SSL/TLS channels, asymmetric cryptography, salted hashing, and offline message queuing. (Grade: 18/20)",
          tags: ["Java", "Spring", "Security"],
          link: "https://github.com/GalaxyCrush/MessagIST",
          details:
            "A secure messaging application with end-to-end encryption: SSL/TLS channels, asymmetric cryptography, salted hashing, and offline message queuing. Grade: 18/20.",
          highlights: [
            "SSL/TLS channels",
            "Asymmetric cryptography",
            "Offline message queuing",
          ],
        },
        {
          name: "Particle-Simulator",
          desc: "2D particle collision simulator in C++ with serial, OpenMP, and MPI parallelization strategies.",
          tags: ["C++", "OpenMP", "MPI"],
          link: "https://github.com/GalaxyCrush/Particle-Simulator",
          details:
            "A 2D particle collision simulator in C++ that compares parallelization strategies to optimize the simulation.",
          highlights: ["Serial, OpenMP, and MPI strategies", "Performance optimization"],
        },
        {
          name: "Dida-Meetings",
          desc: "Fault-tolerant distributed application implementing the Vertical multi-Paxos consensus algorithm in Java, using gRPC and concurrent meeting management across nodes. (Grade: 17.75/20)",
          tags: ["Java", "Paxos", "gRPC"],
          link: "https://github.com/GalaxyCrush/Dida-Meetings",
          details:
            "A fault-tolerant distributed application implementing the Vertical multi-Paxos consensus algorithm, using gRPC and concurrent meeting management across nodes. Grade: 17.75/20.",
          highlights: [
            "Vertical multi-Paxos consensus",
            "gRPC communication",
            "Fault tolerance",
          ],
        },
        {
          name: "Lisboa-Chat",
          desc: "Scalable instant messaging app built with microservices: FastAPI, React/TypeScript, WebSockets, PostgreSQL, Redis, Docker, Kubernetes, and GCP deployment with Terraform and Ansible. (Grade: 20/20)",
          tags: ["Python", "React", "Kubernetes"],
          link: "https://github.com/GalaxyCrush/Lisboa-Chat",
          details:
            "A scalable instant messaging app built with microservices, fully deployed to the cloud. Grade: 20/20.",
          highlights: [
            "FastAPI, React/TypeScript, and WebSockets",
            "PostgreSQL and Redis",
            "Kubernetes on GCP with Terraform and Ansible",
          ],
        },
        {
          name: "UnnamedMineMod",
          desc: "A Minecraft mod created to learn and explore modding concepts.",
          tags: ["Java", "Minecraft", "Modding"],
          link: "https://github.com/GalaxyCrush/UnnamedMineMod",
          details:
            "A Minecraft mod created to learn and explore modding concepts, from the development environment to custom content.",
          highlights: ["Java modding", "Custom content"],
        },
        {
          name: "CTFs-writups",
          desc: "Writeups and scripts used to solve CTFs (Capture The Flag).",
          tags: ["Security", "CTF", "Python"],
          link: "https://github.com/GalaxyCrush/CTFs-writups",
          details:
            "Writeups and scripts used to solve CTF challenges, documenting the thought process and applied techniques.",
          highlights: ["Detailed writeups", "Solve scripts", "Security techniques"],
        },
        {
          name: "static-analysis-tool",
          desc: "Python static analysis tool for web security vulnerability detection. Implements taint analysis to identify unsanitized data flows between untrusted sources and sensitive sinks. (Grade: 19.26/20)",
          tags: ["Python", "Security", "Static Analysis"],
          link: "https://github.com/GalaxyCrush/static-analysis-tool",
          details:
            "A Python static analysis tool implementing taint analysis to detect web vulnerabilities, tracking unsanitized data flows. Grade: 19.26/20.",
          highlights: [
            "Taint analysis",
            "Web vulnerability detection",
            "Untrusted sources and sensitive sinks",
          ],
        },
        {
          name: "Games-at-cloud",
          desc: "System designed to run computationally-intensive tasks inspired by simple games.",
          tags: ["Python", "Cloud"],
          link: "https://github.com/GalaxyCrush/Games-at-cloud",
          details:
            "A system designed to run computationally intensive tasks inspired by simple games, exploring cloud computing concepts.",
          highlights: ["Distributed computing", "Python"],
        },
        {
          name: "ThyroidSupervisedModel",
          desc: "A supervised learning model for thyroid classification.",
          tags: ["Python", "Machine Learning"],
          link: "https://github.com/GalaxyCrush/ThyroidSupervisedModel",
          details:
            "A supervised learning model for thyroid classification, including data exploration and metric evaluation.",
          highlights: ["Supervised learning", "Classification", "Metric analysis"],
        },
      ],
    },
    about: {
      title: "About me",
      p1: "I'm a guy who loves games and has always been interested in technology.",
      p2: "I'm currently a C++ software engineer and I enjoy building software in my free time, reading books, listening to music, watching anime, and playing games.",
      p3: "I'm currently finishing my master's in cybersecurity and distributed systems at IST, with research on Key Management Systems (KMS) at INESC-ID, in collaboration with the Portuguese National Security Office (GNS).",
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
      timelineLabel: "Journey",
      timeline: [
        {
          period: "Oct 2025 — Present",
          title: "Research Assistant",
          place: "INESC-ID · KMS in collaboration with the GNS",
          desc: "Designing a secure and resilient Key Management System (KMS) for governmental environments, as part of my master's thesis.",
        },
        {
          period: "2025 — Present",
          title: "MSc in Cybersecurity and Distributed Systems",
          place: "Instituto Superior Técnico (IST)",
          desc: "Focus on distributed systems, applied cryptography, and systems security.",
        },
        {
          period: "Oct 2024 — Feb 2026",
          title: "Game Dev Técnico · Collaborator",
          place: "CUBOS Game Engine · Graphics Team",
          desc: "Contributing to the graphics team of a minimalistic game engine focused on voxels and data-oriented programming (C++).",
        },
        {
          period: "2021 — 2024",
          title: "BSc in Informatics Engineering",
          place: "Faculty of Sciences, University of Lisbon (FCUL)",
          desc: "Average grade of 16/20.",
        },
      ],
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
      cvLabel: "CV",
      cvUrl: "https://flowcv.com/resume/wutwb4qq8j",
    },
  },
};
