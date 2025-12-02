import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const saltRounds = 10;

app.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User Already Exist' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        });

        res.status(201).json({
            message: 'User created successfully',
            userId: newUser.id,
            email: newUser.email,
            name: newUser.name
        });

    } catch (err) {
        return res.status(500).json({ error: 'Signup failed' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || !email.trim() || !password.trim()) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User Not Exist"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid Credential"
            });
        }

        return res.status(200).json({
            message: "User succesfully Login",
            para: true
        });

    } catch (err) {
        return res.status(500).json({ error: "Login failed" });
    }
});


app.post('/write', async (req, res) => {
    try {
        const { password, email, content, date } = req.body;

        if (!content || !email || !password || !date || !content.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                message: "invalid Credential"
            });
        }

        const existingEntry = await prisma.text.findFirst({
            where: {
                ownerId: user.id,
                date: new Date(date)
            }
        });

        if (existingEntry) {
            return res.status(409).json({
                message: "content for this date already exist"
            });
        }

        const newEntry = await prisma.text.create({
            data: {
                textId: `${Date.now()}-${user.id}`,
                content: content,
                date: new Date(date),
                ownerId: user.id
            }
        });

        return res.status(201).json({
            message: "Content saved"
        });

    } catch (err) {
        return res.status(500).json({ error: "Write failed" });
    }
});

app.post('/read', async (req, res) => {
    try {
        const { password, email, date } = req.body;

        if (!password || !email || !date || !password.trim() || !email.trim()) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                message: "invalid Credential"
            });
        }

        const diaryEntry = await prisma.text.findFirst({
            where: {
                ownerId: user.id,
                date: new Date(date)
            }
        });

        if (!diaryEntry) {
            return res.status(404).json({
                message: "No Content Found For This Date"
            });
        }

        return res.status(200).json({
            content: diaryEntry.content
        });

    } catch (err) {
        return res.status(500).json({ error: "Read failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
