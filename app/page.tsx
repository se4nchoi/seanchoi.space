import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';

const works = [
  {
    name: 'Hoek Agency',
    description: 'Software Engineer',
    link: '/work#hoek',
  },
  {
    name: 'EMG Global',
    description: 'Software Engineer',
    link: '/work#emg',
  },
  {
    name: 'Korea Defense Intelligence Command',
    description: 'Intelligence Specialist',
    link: '/work#kdic',
  },
];

const skills = {
  Languages: ['JavaScript', 'TypeScript', 'Python'],
  Frameworks: ['React.js', 'Next.js', 'Node.js', 'Express'],
  Tools: ['Git', 'Docker', 'PostgreSQL', 'AWS'],
};

export default function Page() {
  return (
    <section className='text-neutral-900 dark:text-neutral-200'>
      <h1 className="mb-8 font-medium text-2xl tracking-tighter">
        👋 hi, I'm Sean
      </h1>
      <div className="my-8 w-52 h-52 overflow-hidden rounded-full">
        <Suspense fallback={<div className="w-52 h-52 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />}>
          <Image 
            src="/avatar.jpg" 
            width={280}
            height={280}
            alt="profile image of Sean"        
          />
        </Suspense>
      </div>
      <p className="prose prose-neutral dark:prose-invert">
        I'm a software engineer, optimist, and part-time adventurer. I'm currently studying Computer Engineering at the University of Toronto, expecting to graduate in 2026.
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm passionate about optimizing workflows and building things that people love. I've had the opportunity to work on exciting projects in both web and automotive industries.
          A unique experience in the military has also helped to shape my problem-solving skills and ability to carve out innovative solutions in non-traditional environments.
        </p>
      </div>
      <div className="my-8">
        <h2 className="font-medium text-2xl mb-4">Work Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work) => (
            <Link href={work.link} key={work.name}>
              <div className="border border-neutral-500 dark:border-neutral-700 rounded-lg p-4 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-lg mb-2">{work.name}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{work.description}</p>
                </div>
                <div className="mt-4 flex items-center text-sm text-neutral-500 dark:text-neutral-300">
                  Read More <ArrowIcon />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* TODO : Projects section
        - website notion sync project
        - AI integration project
        - comments for blog posts
      */}
      <div className="my-8">
        <h2 className="font-medium text-2xl mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(skills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="font-medium text-lg mb-2">{category}</h3>
              <ul className="list-disc list-inside">
                {skills.map((skill) => (
                  <li key={skill} className="text-sm text-neutral-600 dark:text-neutral-400">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <ImageGrid />    
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm always open to connecting and learning about new opportunities. Feel free to reach out!
        </p>
      </div>
      <div className="my-8 flex flex-col justify-center gap-2.5 sm:flex-row sm:space-y-0 sm:space-x-0">
        <Link
          href="https://github.com/se4nchoi"
          className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-neutral-500 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
        >
          <FaGithub className="mr-2" />
          GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/se4nchoi/"
          className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-neutral-500 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
        >
          <FaLinkedin className="mr-2" />
          LinkedIn
        </Link>
        <Link
          href="mailto:se4n.choi@gmail.com"
          className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-neutral-500 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
        >
          <FaEnvelope className="mr-2" />
          Email
        </Link>
      </div>
      <ul className="flex flex-row mt-12 space-x-6">
        <li>
          <Link
            className="flex items-center hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="/blog"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">read my blog</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="/work"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">see my work</p>
          </Link>
        </li>
      </ul>

      </section>
  );
}

const ArrowIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className='ml-1'
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807V0.488636H11.8438V9.49432H10.3438V3.13068L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}
const ImageGrid = () => {
  return (
    <section className='grid grid-cols-2 grid-rows-4 sm:grid-rows-3 sm:grid-cols-3 gap-4 my-8'>
      <div className='relative h-40'>
        <Image  
          alt="Me on top of mount Buk-han doing Mbappe pose"
          src={"/about/about_00.jpg"}
          fill
          sizes="(max-width: 768px) 213, 33vw"
          priority
          className='rounded-lg object-cover'
        />
      </div>
      
      <div className="relative row-span-2">
        <Image 
          alt="Me dressed as TopGun on halloween"
          src={"/about/about_07.jpg"}
          fill
          sizes="(max-width: 768px) 213, 33vw"
          priority
          className='rounded-lg object-cover object-top sm:object-center'
        />
      </div>

      <div className='relative'>
        <Image  
          alt="Me with the silver medal trophy for 2022 Korean Olympics"
          src={"/about/about_06.jpg"}
          fill
          sizes="(max-width: 768px) 213, 33vw"
          priority
          className='rounded-lg object-cover'
        />
      </div>

      <div className="relative row-span-2">
        <Image
          alt="Me with the EMG RUTA40 camping EV crew at 2022 Daegu Camping Exhibition"
          src={"/about/about_10.jpg"}
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover"
        />
      </div>

      <div className='relative sm:row-span-2 row-span-1'>
        <Image
          alt="Team photo after 2022 Korean Olypmics silver medals"
          src={"/about/about_05.jpg"}
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover sm:object-center"
        />
      </div>

      <div className="relative h-40">
        <Image
          alt="Group photo after silver medal match at 2022 Korean Olympics"
          src={"/about/about_04.jpg"}
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover"
        />
      </div>
      
    </section>
  );
}