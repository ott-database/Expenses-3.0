import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Admin user payload
    const adminPayload = {
        userName: 'admin',
        password: 'admin', // Make sure to hash this in a real application
        role: 'ADMIN' as Role, // Assuming you have a role field for user types
    };

    // Account payload
    const accountPayload = {
        accountName: 'Bkash',
        balance: 1000, // Default balance for the account
    };

    // Create admin user
    const existingAdmin = await prisma.user.findFirst({
        where: { userName: adminPayload.userName },
    });

    if (!existingAdmin) {
        const admin = await prisma.user.create({
            data: adminPayload,
        });

        console.log('Admin user created:', admin);
    } else {
        console.log('Admin user already exists');
    }

    // Create account
    const existingAccount = await prisma.account.findFirst({
        where: { accountName: accountPayload.accountName },
    });

    if (!existingAccount) {
        const account = await prisma.account.create({
            data: accountPayload,
        });

        console.log('Account created:', account);
    } else {
        console.log('Account already exists');
    }
}

main()
    .catch((error) => {
        console.error('Error seeding data:', error);
        process.exit(1);
    })
    // .finally(async () => {
    //     await prisma.$disconnect();
    // });
