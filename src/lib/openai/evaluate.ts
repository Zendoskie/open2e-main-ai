import { LearnerResult } from "@/types/evaluation/learner";
import { fetch } from "@tauri-apps/plugin-http";
import { OPEN2E_BACKEND } from "@/constant/hostname";

interface IEvaluate {
  question: string;
  answer: string;
}

export const evaluate = async ({
  question,
  answer,
}: IEvaluate): Promise<{ result: LearnerResult | null; error?: string }> => {
  try {
    const res = await fetch(`${OPEN2E_BACKEND}/api/evaluate/v1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });

    if (!res.ok) {
      return { result: null, error: await res.text() };
    }

    return await res.json();
  } catch (error: any) {
    console.log(error);
    return { result: null, error: error.message || "Network error" };
  }
};
