import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  User, InsertUser,
  ContactSubmission, InsertContact,
  InvestorInquiry, InsertInvestorInquiry,
  Product, InsertProduct,
  Division, InsertDivision,
  users, contactSubmissions, investorInquiries, products, divisions
} from "@shared/schema";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;

  // Contact methods
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  updateContactSubmission(id: number, data: Partial<ContactSubmission>): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: number): Promise<boolean>;

  // Investor methods
  createInvestorInquiry(data: InsertInvestorInquiry): Promise<InvestorInquiry>;
  getAllInvestorInquiries(): Promise<InvestorInquiry[]>;
  getInvestorInquiry(id: number): Promise<InvestorInquiry | undefined>;
  updateInvestorInquiry(id: number, data: Partial<InvestorInquiry>): Promise<InvestorInquiry | undefined>;
  deleteInvestorInquiry(id: number): Promise<boolean>;

  // Product methods
  createProduct(data: InsertProduct): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getProductsByDivision(division: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Division methods
  createDivision(data: InsertDivision): Promise<Division>;
  getAllDivisions(): Promise<Division[]>;
  getDivision(id: number): Promise<Division | undefined>;
  getDivisionBySlug(slug: string): Promise<Division | undefined>;
  updateDivision(id: number, data: Partial<InsertDivision>): Promise<Division | undefined>;
  deleteDivision(id: number): Promise<boolean>;

  // Session store for authentication
  sessionStore: session.SessionStore;
}

/*
export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const [updatedUser] = await db.update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const [deletedUser] = await db.delete(users)
      .where(eq(users.id, id))
      .returning();
    return !!deletedUser;
  }

  // Contact methods
  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }

  async updateContactSubmission(id: number, data: Partial<ContactSubmission>): Promise<ContactSubmission | undefined> {
    const [updatedSubmission] = await db.update(contactSubmissions)
      .set(data)
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updatedSubmission;
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    const [deletedSubmission] = await db.delete(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .returning();
    return !!deletedSubmission;
  }

  // Investor methods
  async createInvestorInquiry(data: InsertInvestorInquiry): Promise<InvestorInquiry> {
    const [inquiry] = await db.insert(investorInquiries).values(data).returning();
    return inquiry;
  }

  async getAllInvestorInquiries(): Promise<InvestorInquiry[]> {
    return await db.select().from(investorInquiries);
  }

  async getInvestorInquiry(id: number): Promise<InvestorInquiry | undefined> {
    const [inquiry] = await db.select().from(investorInquiries).where(eq(investorInquiries.id, id));
    return inquiry;
  }

  async updateInvestorInquiry(id: number, data: Partial<InvestorInquiry>): Promise<InvestorInquiry | undefined> {
    const [updatedInquiry] = await db.update(investorInquiries)
      .set(data)
      .where(eq(investorInquiries.id, id))
      .returning();
    return updatedInquiry;
  }

  async deleteInvestorInquiry(id: number): Promise<boolean> {
    const [deletedInquiry] = await db.delete(investorInquiries)
      .where(eq(investorInquiries.id, id))
      .returning();
    return !!deletedInquiry;
  }

  // Product methods
  async createProduct(data: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(data).returning();
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductsByDivision(division: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.division, division));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db.update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const [deletedProduct] = await db.delete(products)
      .where(eq(products.id, id))
      .returning();
    return !!deletedProduct;
  }

  // Division methods
  async createDivision(data: InsertDivision): Promise<Division> {
    const [division] = await db.insert(divisions).values(data).returning();
    return division;
  }

  async getAllDivisions(): Promise<Division[]> {
    return await db.select().from(divisions);
  }

  async getDivision(id: number): Promise<Division | undefined> {
    const [division] = await db.select().from(divisions).where(eq(divisions.id, id));
    return division;
  }

  async getDivisionBySlug(slug: string): Promise<Division | undefined> {
    const [division] = await db.select().from(divisions).where(eq(divisions.slug, slug));
    return division;
  }

  async updateDivision(id: number, data: Partial<InsertDivision>): Promise<Division | undefined> {
    const [updatedDivision] = await db.update(divisions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(divisions.id, id))
      .returning();
    return updatedDivision;
  }

  async deleteDivision(id: number): Promise<boolean> {
    const [deletedDivision] = await db.delete(divisions)
      .where(eq(divisions.id, id))
      .returning();
    return !!deletedDivision;
  }
}
*/
/*
export const storage = new DatabaseStorage();
*/