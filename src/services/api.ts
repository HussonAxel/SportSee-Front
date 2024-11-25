import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Types pour les sessions moyennes
export interface SessionData {
  day: number;
  sessionLength: number;
}

export interface AverageSessionResponse {
  data: {
    userId: number;
    sessions: SessionData[];
  };
}

// Types pour l'activité
export interface ActivitySession {
  day: string;
  kilogram: number;
  calories: number;
}

export interface ActivityResponse {
  data: {
    userId: number;
    sessions: ActivitySession[];
  };
}

// Types pour la performance
export interface PerformanceData {
  value: number;
  kind: number;
}

export interface PerformanceResponse {
  data: {
    userId: number;
    kind: { [key: number]: string };
    data: PerformanceData[];
  };
}

// Types pour les informations utilisateur
export interface UserMainData {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore?: number;
  score?: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

export interface UserResponse {
  data: UserMainData;
}

/**
 * Service pour gérer toutes les requêtes API liées à l'utilisateur
 */
class UserService {
  /**
   * Méthode générique pour faire des requêtes HTTP
   */
  private async fetch<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get<T>(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Récupère les informations principales de l'utilisateur
   */
  async getUserInfo(userId: number): Promise<UserMainData> {
    const response = await this.fetch<UserResponse>(`/user/${userId}`);
    return response.data;
  }

  /**
   * Récupère l'activité de l'utilisateur
   */
  async getActivity(userId: number): Promise<ActivitySession[]> {
    const response = await this.fetch<ActivityResponse>(
      `/user/${userId}/activity`
    );
    return response.data.sessions;
  }

  /**
   * Récupère les sessions moyennes de l'utilisateur
   */
  async getAverageSessions(userId: number): Promise<SessionData[]> {
    const response = await this.fetch<AverageSessionResponse>(
      `/user/${userId}/average-sessions`
    );
    return response.data.sessions;
  }

  /**
   * Récupère les données de performance de l'utilisateur
   */
  async getPerformance(userId: number): Promise<PerformanceResponse["data"]> {
    const response = await this.fetch<PerformanceResponse>(`/user/${userId}/performance`);
    return response.data;
  }

  /**
   * Récupère le score de l'utilisateur
   */
  async getScore(userId: number): Promise<number> {
    const userInfo = await this.getUserInfo(userId);
    // Le score peut être soit dans todayScore soit dans score
    return (userInfo.todayScore ?? userInfo.score ?? 0) * 100;
  }

  /**
   * Récupère toutes les données d'un utilisateur en une seule fois
   */
  async getAllUserData(userId: number) {
    try {
      const [userInfo, activity, averageSessions, performance] =
        await Promise.all([
          this.getUserInfo(userId),
          this.getActivity(userId),
          this.getAverageSessions(userId),
          this.getPerformance(userId),
        ]);

      return {
        userInfo,
        activity,
        averageSessions,
        performance,
      };
    } catch (error) {
      console.error("Error fetching all user data:", error);
      throw error;
    }
  }
}

// Export d'une instance unique du service
export const userService = new UserService();

// Export des constantes utiles
export const PERFORMANCE_KINDS = {
  1: "Intensité",
  2: "Vitesse",
  3: "Force",
  4: "Endurance",
  5: "Énergie",
  6: "Cardio",
} as const;

export const DAYS_MAP = {
  1: "L",
  2: "M",
  3: "M",
  4: "J",
  5: "V",
  6: "S",
  7: "D",
} as const;

// Types utilitaires
export type PerformanceKind = keyof typeof PERFORMANCE_KINDS;
export type DayKey = keyof typeof DAYS_MAP;

// Export des helpers de formatage
export const formatters = {
  /**
   * Formate un nombre en calories avec l'unité
   */
  formatCalories: (value: number) => `${value}kCal`,

  /**
   * Formate un nombre en kilogrammes avec l'unité
   */
  formatKilograms: (value: number) => `${value}kg`,

  /**
   * Formate un score en pourcentage
   */
  formatScore: (value: number) => `${Math.round(value * 100)}%`,
};
