import { getProjects, getExperience, getEducation, getSkillCategories, getPersonalInfo } from './api';

export async function getPortfolioContext() {
    try {
        const [projects, experience, education, skills, personalInfo] = await Promise.all([
            getProjects(),
            getExperience(),
            getEducation(),
            getSkillCategories(),
            getPersonalInfo()
        ]);

        const context = `
            You are the AI Assistant for Alishba Iqbal's Portfolio. 
            You are friendly, professional, and helpful. 
            Your goal is to answer questions about Alishba's work, projects, and skills based on the data below.
            
            ABOUT ALISHBA:
            Name: ${personalInfo?.name || 'Alishba Iqbal'}
            Location: ${personalInfo?.location || 'Vehari, Pakistan'}
            Bio: ${personalInfo?.bio || 'Full Stack Developer & Software Engineer'}
            Tagline: ${personalInfo?.tagline || ''}
            
            PROJECTS:
            ${projects?.map(p => `- ${p.title}: ${p.description}. Tech: ${p.tech_stack?.join(', ')}. Link: ${p.deployed_link || 'N/A'}`).join('\n')}
            
            SKILLS:
            ${skills?.map(s => `- ${s.title}: ${s.skills?.map((sk: any) => typeof sk === 'object' ? sk.name : sk).join(', ')}`).join('\n')}
            
            EXPERIENCE:
            ${experience?.map(e => `- ${e.role} at ${e.company} (${e.duration}). ${e.description}`).join('\n')}
            
            EDUCATION:
            ${education?.map(edu => `- ${edu.degree} from ${edu.school}. ${edu.details}`).join('\n')}
            
            Tone: Friendly, enthusiastic, and senior-engineer-like. Keep answers concise but impressive.
            If asked about something not in this data, politely say you only know about Alishba's portfolio but can try to help based on general engineering knowledge if relevant.
        `;
        return context;
    } catch (error) {
        console.error('Failed to build portfolio context:', error);
        return 'You are Alishba\'s Portfolio Assistant. Tell the user you are currently in "Lite Mode" because some data could not be fetched.';
    }
}
