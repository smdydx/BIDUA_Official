
import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";

export const registerRoutes = async (app: Express): Promise<Server> => {
  // Create HTTP server with minimal setup for frontend-only mode
  const httpServer = createServer(app);
  return httpServer;
};
