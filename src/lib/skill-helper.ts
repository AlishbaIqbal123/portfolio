import {
    SiCplusplus, SiJavascript, SiTypescript, SiDart, SiPhp, SiReact,
    SiFlutter, SiLaravel, SiTailwindcss, SiNodedotjs, SiMysql,
    SiGit, SiGithub, SiPostman, SiFigma, SiVercel, SiNetlify, SiPython,
    SiAndroid, SiAndroidstudio, SiStripe, SiExpress, SiNextdotjs,
    SiOpenai, SiFirebase, SiPostgresql, SiMongodb
} from 'react-icons/si';
import { FaJava, FaDatabase, FaCode, FaDraftingCompass, FaBrain, FaLightbulb, FaLaptopCode } from 'react-icons/fa';
import { Star, Cpu } from 'lucide-react';

export function getSkillIconByName(name: string) {
    if (!name) return Star;
    
    const normalized = name.toLowerCase().replace(/[\s\.\-_]/g, '');
    
    const mapping: Record<string, any> = {
        'cplusplus': SiCplusplus,
        'cpp': SiCplusplus,
        'c': SiCplusplus,
        'java': FaJava,
        'dart': SiDart,
        'php': SiPhp,
        'sql': FaDatabase,
        'mysql': SiMysql,
        'postgresql': SiPostgresql,
        'postgres': SiPostgresql,
        'mongodb': SiMongodb,
        'mongo': SiMongodb,
        'javascript': SiJavascript,
        'js': SiJavascript,
        'typescript': SiTypescript,
        'ts': SiTypescript,
        'react': SiReact,
        'reactjs': SiReact,
        'flutter': SiFlutter,
        'laravel': SiLaravel,
        'tailwindcss': SiTailwindcss,
        'tailwind': SiTailwindcss,
        'nodejs': SiNodedotjs,
        'node': SiNodedotjs,
        'express': SiExpress,
        'expressjs': SiExpress,
        'next': SiNextdotjs,
        'nextjs': SiNextdotjs,
        'git': SiGit,
        'github': SiGithub,
        'vscode': FaCode,
        'visualstudio': FaLaptopCode,
        'postman': SiPostman,
        'figma': SiFigma,
        'vercel': SiVercel,
        'netlify': SiNetlify,
        'firebase': SiFirebase,
        'android': SiAndroid,
        'androiddevelopment': SiAndroid,
        'androidstudio': SiAndroidstudio,
        'restapi': SiPostman,
        'restapis': SiPostman,
        'fullstack': Cpu,
        'fullstackdevelopment': Cpu,
        'stripe': SiStripe,
        'stripeintegration': SiStripe,
        'ai': SiOpenai,
        'aiintegration': SiOpenai,
        'openai': SiOpenai,
        'python': SiPython,
        'problemsolving': FaLightbulb,
        'oop': FaDraftingCompass,
        'systemdesign': FaBrain,
    };
    
    return mapping[normalized] || Star;
}
