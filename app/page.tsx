import Image from 'next/image';
import Link from 'next/link';
import { IconType } from 'react-icons';
import {
  FaGithub, FaLinkedin, FaEnvelope
} from 'react-icons/fa6';

export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">hi, this is Sean 🙌</h1>
      <div className="my-4 w-48 h-48 overflow-hidden rounded-full">
        <Image 
          src="/avatar.jpg" 
          width={240}
          height={240}
          alt="face image of Sean"        
        />
      </div>

      <div>
        {/* should include pics */}
      </div>

      <p className="prose prose-neutral dark:prose-invert">
        A 🇰🇷Korean-born, 🇨🇦Canadian-raised software engineer with a passion for optimizing workflows.<br></br>
        Expected graduate of the University of Toronto's Computer Engineering program in 2025.<br></br>
        Interested in exploring what web, AI, automotive, financial, and semi-conductor will offer in the near future.<br/><br/>
        
        An occasional chef, part-time adventurer, and football fanatic — always looking for new experiences and challenges!
      </p>

      <div className='flex justify-center align-middle mt-8'>
        <p className='prose prose-neutral dark:prose-invert'>
          if you want to find more about me, feel free to reach :
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