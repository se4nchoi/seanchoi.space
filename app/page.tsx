import Image from 'next/image';
import Link from 'next/link';
import {
  FaGithub, FaLinkedin, FaEnvelope
} from 'react-icons/fa6';

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 font-medium text-3xl tracking-tighter">hi, this is Sean 🙌</h1>
      <div className="my-4 w-52 h-52 overflow-hidden rounded-full">
        <Image 
          src="/avatar.jpg" 
          width={280}
          height={280}
          alt="face image of Sean"        
        />
      </div>

      <p className="prose prose-neutral dark:prose-invert mb-4">
        A 🇰🇷Korean-born, 🇨🇦Canadian-raised software engineer with a passion for optimizing workflows.
      </p>
      <p className="prose prose-neutral dark:prose-invert mb-4">
        Expected graduate of the University of Toronto's Computer Engineering program in 2026.
      </p>
      <p className="prose prose-neutral dark:prose-invert mb-4">
        Interested in exploring what web, AI, automotive, financial, and semi-conductor 
        will offer in the near future, especially having had{' '}
        <Link href={"/work"}>
          related experience
        </Link>
        {' '}in web and automotive.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        An occasional chef, a football fanatic, and an optimistic part-time adventurer — always looking for new experiences and challenges.
      </p>
      <ImageSection />
      <div className='flex justify-center align-middle mt-8'>
        <p className='prose prose-neutral dark:prose-invert'>
          if you want to connect or know more about me, feel free to reach out at:
        </p>
      </div>
      <div className='flex justify-center align-middle gap-8 my-2'>
          <Link href={`mailto:se4n.choi@gmail.com`} target='_blank'>
            <span className='sr-only'>mail</span>
            <FaEnvelope size={'1.75rem'}/>
          </Link>
          <Link href={`https://github.com/se4nchoi`} target='_blank'>
            <span className='sr-only'>github</span>
            <FaGithub size={'1.75rem'}/>
          </Link>
          <Link href={`https://www.linkedin.com/in/se4nchoi/`} target='_blank'>
            <span className='sr-only'>linkedIn</span>
            <FaLinkedin size={'1.75rem'}/>
          </Link>
        </div>
    </section>
  );
}

const ImageSection = () => {
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
};