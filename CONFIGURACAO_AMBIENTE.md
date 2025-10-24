# 🔧 Configuração das Variáveis de Ambiente

Para que o upload de imagens funcione corretamente, precisa de configurar as seguintes variáveis de ambiente:

## 📋 Variáveis Necessárias

### Supabase (NECESSÁRIO para upload de imagens)
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 🚀 Como Configurar o Supabase Storage

### Passo 1: Criar o Bucket
1. Aceda ao [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá ao seu projeto
3. Clique em **Storage** no menu lateral
4. Clique **"New bucket"**
5. Nome: `property-images`
6. Marque **"Public bucket"**
7. Clique **"Create bucket"**

### Passo 2: Configurar Políticas de Segurança
Execute este SQL no **SQL Editor** do Supabase:

```sql
-- Política para permitir uploads públicos
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT TO public
WITH CHECK (bucket_id = 'property-images');

-- Política para permitir downloads públicos
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'property-images');

-- Política para permitir eliminações públicas
CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE TO public
USING (bucket_id = 'property-images');
```

## 📁 Onde Configurar

### Para Desenvolvimento Local
Crie um arquivo `.env.local` na raiz do projeto:
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### Para Produção
Configure as variáveis de ambiente na sua plataforma de hospedagem (Vercel, Netlify, etc.)

## ✅ Como Verificar se Está Configurado

1. Aceda ao painel de administração: `/admin/dashboard`
2. Vá ao separador **"Teste"**
3. Clique em **"Testar Upload"**
4. Se aparecer "Test upload successful", está tudo configurado!

## 🚨 Problemas Comuns

### Erro: "new row violates row-level security policy"
- **Solução**: Execute o SQL das políticas de segurança no Supabase

### Erro: "Upload failed"
- **Solução**: Verifique se o bucket `property-images` existe e é público
- **Solução**: Verifique se as políticas de segurança estão configuradas

### Erro: "File too large"
- **Solução**: Reduza o tamanho da imagem (máximo 10MB)

### Erro: "Invalid file type"
- **Solução**: Use apenas ficheiros de imagem (JPG, PNG, WEBP, etc.)

## 📞 Suporte

Se continuar com problemas:
1. Verifique os logs no console do navegador
2. Verifique os logs do servidor
3. Teste primeiro com o componente de teste
4. Certifique-se que todas as variáveis estão configuradas
