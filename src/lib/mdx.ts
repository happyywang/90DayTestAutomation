import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { CourseDay } from '@/types';

const contentDirectory = path.join(process.cwd(), 'src/content/days');

export async function getDayContent(dayId: number): Promise<CourseDay | null> {
  try {
    const fileName = `day-${dayId}.md`;
    const filePath = path.join(contentDirectory, fileName);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const { text: readingTimeText } = readingTime(content);

    return {
      id: dayId,
      title: data.title || `Day ${dayId}`,
      phase: data.phase || 1,
      phaseTitle: data.phaseTitle || 'Course Phase',
      description: data.description || '',
      content,
      objectives: data.objectives || [],
      exercises: data.exercises || [],
      resources: data.resources || [],
      readingTime: parseInt(readingTimeText.split(' ')[0]) || 5,
    };
  } catch (error) {
    console.error(`Error loading day ${dayId}:`, error);
    return null;
  }
}

export async function getAllDays(): Promise<CourseDay[]> {
  const days: CourseDay[] = [];
  
  for (let i = 1; i <= 90; i++) {
    const day = await getDayContent(i);
    if (day) {
      days.push(day);
    }
  }
  
  return days;
}

export function getPhaseInfo(phase: number) {
  const phases = {
    1: { title: "Architecture & Core Foundations", days: "1-15" },
    2: { title: "API Automation & Integration Testing", days: "16-21" },
    3: { title: "Continuous Integration & Distributed Testing", days: "22-30" },
    4: { title: "Playwright & AI-Powered Testing", days: "31-42" },
    5: { title: "Performance & Security Testing", days: "43-57" },
    6: { title: "Test Platform & Cloud-Native Deployment", days: "58-90" }
  };
  
  return phases[phase as keyof typeof phases] || { title: "Unknown Phase", days: "N/A" };
}

export function getAdjacentDays(currentDay: number) {
  return {
    previous: currentDay > 1 ? currentDay - 1 : null,
    next: currentDay < 90 ? currentDay + 1 : null,
  };
}