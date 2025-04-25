// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { Express, Request, Response, NextFunction } from "express";
// import session from "express-session";
// import { scrypt, randomBytes, timingSafeEqual } from "crypto";
// import { promisify } from "util";
// import { storage } from "./storage";
// import { User as UserType, insertUserSchema } from "@shared/schema";
// import { z } from "zod";

// declare global {
//   namespace Express {
//     // Define User interface without extending itself
//     interface User {
//       id: number;
//       username: string;
//       password: string;
//       email: string;
//       fullName?: string;
//       role: string;
//       createdAt: Date;
//       updatedAt: Date;
//     }
//   }
// }

// const scryptAsync = promisify(scrypt);

// async function hashPassword(password: string) {
//   const salt = randomBytes(16).toString("hex");
//   const buf = (await scryptAsync(password, salt, 64)) as Buffer;
//   return `${buf.toString("hex")}.${salt}`;
// }

// async function comparePasswords(supplied: string, stored: string) {
//   const [hashed, salt] = stored.split(".");
//   const hashedBuf = Buffer.from(hashed, "hex");
//   const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
//   return timingSafeEqual(hashedBuf, suppliedBuf);
// }

// // Create an extended schema for registration
// const registrationSchema = insertUserSchema.extend({
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// // Login schema
// const loginSchema = z.object({
//   username: z.string().min(2, { message: "Username must be at least 2 characters" }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters" }),
// });

// export function setupAuth(app: Express) {
//   const sessionSecret = process.env.SESSION_SECRET || 'your-secret-key';
  
//   const sessionSettings: session.SessionOptions = {
//     secret: sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     store: storage.sessionStore,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     }
//   };

//   app.set("trust proxy", 1);
//   app.use(session(sessionSettings));
//   app.use(passport.initialize());
//   app.use(passport.session());

//   passport.use(
//     new LocalStrategy(async (username, password, done) => {
//       try {
//         const user = await storage.getUserByUsername(username);
//         if (!user || !(await comparePasswords(password, user.password))) {
//           return done(null, false, { message: "Invalid username or password" });
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }),
//   );

//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser(async (id: number, done) => {
//     try {
//       const user = await storage.getUser(id);
//       if (!user) {
//         return done(null, false);
//       }
//       done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   });

//   // Register a new user
//   app.post("/api/register", async (req, res, next) => {
//     try {
//       // Validate request body
//       const result = registrationSchema.safeParse(req.body);
//       if (!result.success) {
//         return res.status(400).json({ errors: result.error.errors });
//       }

//       const { confirmPassword, ...userData } = result.data;

//       // Check if username exists
//       const existingUser = await storage.getUserByUsername(userData.username);
//       if (existingUser) {
//         return res.status(400).json({ message: "Username already exists" });
//       }

//       // Check if email exists
//       const existingEmail = await storage.getUserByEmail(userData.email);
//       if (existingEmail) {
//         return res.status(400).json({ message: "Email already exists" });
//       }

//       // Hash password
//       const hashedPassword = await hashPassword(userData.password);

//       // Create user
//       const user = await storage.createUser({
//         ...userData,
//         password: hashedPassword,
//       });

//       // Log the user in
//       req.login(user, (err) => {
//         if (err) return next(err);
//         // Exclude password from the response
//         const { password, ...userWithoutPassword } = user;
//         res.status(201).json(userWithoutPassword);
//       });
//     } catch (error) {
//       next(error);
//     }
//   });

//   // Login
//   app.post("/api/login", (req, res, next) => {
//     try {
//       // Validate request body
//       const result = loginSchema.safeParse(req.body);
//       if (!result.success) {
//         return res.status(400).json({ errors: result.error.errors });
//       }

//       passport.authenticate("local", (err: Error, user: UserType, info: any) => {
//         if (err) return next(err);
//         if (!user) return res.status(401).json({ message: info.message || "Invalid username or password" });
        
//         req.login(user, (error) => {
//           if (error) return next(error);
          
//           // Exclude password from the response
//           const { password, ...userWithoutPassword } = user;
//           res.status(200).json(userWithoutPassword);
//         });
//       })(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   });

//   // Logout
//   app.post("/api/logout", (req, res, next) => {
//     req.logout((err) => {
//       if (err) return next(err);
//       res.sendStatus(200);
//     });
//   });

//   // Get current user
//   app.get("/api/user", (req, res) => {
//     if (!req.isAuthenticated()) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }
//     // Exclude password from the response
//     const { password, ...userWithoutPassword } = req.user as UserType;
//     res.json(userWithoutPassword);
//   });

//   // Admin-only middleware
//   const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
//     if (!req.isAuthenticated()) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }
    
//     const user = req.user as UserType;
//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }
    
//     next();
//   };

//   // Register the admin middleware for the app to use in routes
//   app.use("/api/admin/*", requireAdmin);

//   return { requireAdmin };
// }