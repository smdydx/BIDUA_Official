import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from "ws";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import * as schema from "../shared/schema";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

neonConfig.webSocketConstructor = ws;
const scryptAsync = promisify(scrypt);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function seedAdminUser() {
  console.log("🔄 Creating admin user...");
  
  try {
    // Check if admin user already exists
    const existingAdmin = await db.select().from(users).where(eq(users.username, 'admin'));
    
    if (existingAdmin.length > 0) {
      console.log("✅ Admin user already exists, skipping creation.");
      return;
    }
    
    // Admin user credentials - in production, use environment variables
    const adminUser = {
      username: 'admin',
      password: await hashPassword('admin123'),
      email: 'admin@bidua.com',
      fullName: 'BIDUA Administrator',
      role: 'admin'
    };
    
    // Insert admin user
    const result = await db.insert(users).values(adminUser).returning();
    console.log("✅ Admin user created successfully:", result[0].username);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  }
}

async function seedDivisions() {
  console.log("🔄 Creating default divisions...");
  
  try {
    const divisions = [
      {
        name: "Naploo™ Pods",
        slug: "naploo",
        description: "India's first smart pod hotel chain with hourly booking",
        imageUrl: "/assets/naploo.jpg",
        isActive: true,
        content: JSON.stringify({
          subtitle: "Revolutionary Pod Hotels",
          features: [
            "Smart hourly booking system",
            "Luxury amenities in compact spaces",
            "Perfect for travelers and professionals",
            "Nationwide presence"
          ]
        }),
      },
      {
        name: "BIDUA Beauty Care",
        slug: "beauty-care",
        description: "Premium skincare products focusing on dark circle/spot removal",
        imageUrl: "/assets/beauty-care.jpg",
        isActive: true,
        content: JSON.stringify({
          subtitle: "Advanced Skincare Solutions",
          features: [
            "Natural ingredients",
            "Dark spot removal formulas",
            "Anti-aging treatments",
            "Clinical testing and certification"
          ]
        })
      },
      {
        name: "BIDUA CloudDrive™",
        slug: "cloud-drive",
        description: "Smart storage device with hybrid online/offline capabilities",
        imageUrl: "/assets/cloud-drive.jpg",
        isActive: true,
        content: JSON.stringify({
          subtitle: "Next-Gen Hybrid Storage",
          features: [
            "Seamless online-offline synchronization",
            "Enterprise-grade security",
            "Cross-platform compatibility",
            "Automatic backup features"
          ]
        })
      },
      {
        name: "BIDUA OEM Solutions",
        slug: "oem-solutions",
        description: "Multi-industry manufacturing hub with pan-India network",
        imageUrl: "/assets/oem-solutions.jpg",
        isActive: true,
        content: JSON.stringify({
          subtitle: "Manufacturing Excellence",
          features: [
            "Custom manufacturing solutions",
            "Quality control systems",
            "Multi-industry expertise",
            "Pan-India distribution network"
          ]
        })
      },
      {
        name: "BIDUA IT Connect",
        slug: "it-connect",
        description: "B2B software solutions portal",
        imageUrl: "/assets/it-connect.jpg",
        isActive: true,
        content: JSON.stringify({
          subtitle: "Enterprise Software Solutions",
          features: [
            "Custom software development",
            "Cloud migration services",
            "Enterprise API solutions",
            "Managed IT services"
          ]
        })
      }
    ];
    
    // Check existing divisions first
    const existingDivisions = await db.select().from(schema.divisions);
    
    if (existingDivisions.length > 0) {
      console.log("✅ Divisions already exist, skipping creation.");
      return;
    }
    
    // Insert divisions
    const result = await db.insert(schema.divisions).values(divisions).returning();
    console.log(`✅ Created ${result.length} divisions successfully!`);
  } catch (error) {
    console.error("❌ Error creating divisions:", error);
  }
}

async function main() {
  try {
    await seedAdminUser();
    await seedDivisions();
    console.log("✅ All seeds completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    await pool.end();
  }
}

main();