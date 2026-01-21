import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from '@/db/connectDb'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB()
        const user = await User.findOne({ email: credentials.email })
        if (!user || !user.passwordHash) return null
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!isValid) return null
        return { id: user._id.toString(), email: user.email, name: user.username }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'github') {
          await connectDB()
          // robust email fallback
          const email = user?.email || profile?.email || (profile?.login ? `${profile.login}@users.noreply.github.com` : null)
          if (!email) return false
          const existing = await User.findOne({ email })
          if (!existing) {
            await User.create({ email, username: profile?.login || email.split('@')[0], name: user?.name || profile?.name || '' })
          }
        }
        return true
      } catch (err) {
        console.error('signIn error', err)
        return false
      }
    },
    async session({ session, token }) {
      if (!session.user) return session
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.id = dbUser._id.toString()
        session.user.name = dbUser.username || session.user.name
      }
      return session
    },
    async jwt({ token, user }) {
      // include id from credentials authorize
      if (user?.id) token.id = user.id
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }