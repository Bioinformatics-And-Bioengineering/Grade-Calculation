import { z } from 'zod'

export const authInputSchema = z.object({
    email: z.string().min(1, 'メールアドレスを入力してください').email('有効なメールアドレスを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください').min(6, 'パスワードは少なくとも6文字必要です')
})

export type AuthFormInput = z.infer<typeof authInputSchema>
