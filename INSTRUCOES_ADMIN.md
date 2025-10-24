# 📖 Instruções do Painel de Administração - TeamConcept

## 🔐 Como Aceder ao Painel Admin

1. **Acesso Secreto**: Clique 3 vezes rapidamente no canto inferior direito da página
2. **Login**: 
   - Utilizador: `admin`
   - Senha: `admin`

---

## ⚙️ Configuração Inicial do Supabase

**IMPORTANTE**: Antes de adicionar imóveis, precisa configurar a base de dados no Supabase.

### Passo 1: Aceder ao Supabase
1. Vá para: https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto conectado a este site

### Passo 2: Executar o Script SQL
1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New Query"**
3. Copie TODO o conteúdo do ficheiro `scripts/000_setup_complete_database.sql`
4. Cole no editor SQL
5. Clique em **"Run"** (ou pressione Ctrl+Enter)

### Passo 3: Verificar
1. No menu lateral, clique em **"Table Editor"**
2. Deve ver 3 tabelas:
   - `properties` (imóveis)
   - `property_images` (imagens dos imóveis)
   - `admin_users` (utilizadores admin)

---

## 📝 Como Adicionar um Novo Imóvel

### 1. Criar o Imóvel
1. Aceda ao painel admin (3 cliques no canto inferior direito)
2. Faça login com `admin` / `admin`
3. Clique no separador **"Adicionar Imóvel"**
4. Preencha todos os campos:
   - **Tipo**: Casa, Apartamento ou Terreno
   - **Preço**: Em euros (€)
   - **Título**: Em português E inglês
   - **Área**: Em metros quadrados (m²)
   - **Quartos, Casas de Banho, Vagas**: Números
   - **Cidade e Bairro**: Localização
   - **Descrição**: Em português E inglês
   - **URL do Vídeo**: (opcional) Ver instruções abaixo
   - **URL do Mapa**: (opcional) Ver instruções abaixo
   - **Imóvel em Destaque**: Ative para aparecer na página inicial

5. Clique em **"Guardar Imóvel"**

### 2. Adicionar Fotos ao Imóvel

**IMPORTANTE**: Só pode adicionar fotos DEPOIS de criar o imóvel!

1. Após guardar o imóvel, vá ao separador **"Listar Imóveis"**
2. Encontre o imóvel que acabou de criar
3. Clique no botão **"Editar"** (ícone de lápis)
4. Role para baixo até à secção **"Imagens do Imóvel"**
5. Clique no botão **"Adicionar Imagens"**
6. Selecione uma ou várias fotos do seu computador
7. Aguarde o upload (verá um indicador de carregamento)
8. As fotos aparecerão automaticamente

**Dicas sobre Fotos**:
- A **primeira foto** será a imagem de capa do imóvel
- Pode adicionar múltiplas fotos de uma vez
- Formatos aceites: JPG, PNG, WEBP
- Tamanho recomendado: Máximo 5MB por foto
- Para eliminar uma foto, clique no **X** vermelho no canto da imagem

---

## 🎥 Como Adicionar Vídeo do YouTube

### Passo 1: Obter o Link de Incorporação
1. Vá ao vídeo no YouTube
2. Clique em **"Partilhar"** (Share)
3. Clique em **"Incorporar"** (Embed)
4. Copie o URL que está dentro de `src="..."`

### Passo 2: Formato Correto
O URL deve estar neste formato:
\`\`\`
https://www.youtube.com/embed/ID_DO_VIDEO
\`\`\`

**Exemplo**:
- ❌ ERRADO: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- ✅ CORRETO: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### Passo 3: Colar no Campo
1. No formulário do imóvel, encontre o campo **"URL do Vídeo"**
2. Cole o URL no formato correto
3. Guarde o imóvel

---

## 🗺️ Como Adicionar Mapa do Google Maps

### Passo 1: Encontrar o Local
1. Vá para: https://www.google.com/maps
2. Procure o endereço do imóvel
3. Certifique-se que o marcador está no local correto

### Passo 2: Obter o Link de Incorporação
1. Clique em **"Partilhar"** (Share)
2. Clique em **"Incorporar um mapa"** (Embed a map)
3. Copie o URL que está dentro de `src="..."`

### Passo 3: Formato Correto
O URL deve começar com:
\`\`\`
https://www.google.com/maps/embed?pb=...
\`\`\`

### Passo 4: Colar no Campo
1. No formulário do imóvel, encontre o campo **"URL do Mapa"**
2. Cole o URL
3. Guarde o imóvel

---

## ✏️ Como Editar um Imóvel

1. Vá ao separador **"Listar Imóveis"**
2. Encontre o imóvel que quer editar
3. Clique no botão **"Editar"** (ícone de lápis)
4. Faça as alterações necessárias
5. Clique em **"Guardar Imóvel"**

---

## 🗑️ Como Eliminar um Imóvel

1. Vá ao separador **"Listar Imóveis"**
2. Encontre o imóvel que quer eliminar
3. Clique no botão **"Eliminar"** (ícone de lixo)
4. Confirme a eliminação

**ATENÇÃO**: Esta ação não pode ser desfeita!

---

## 🔧 Resolução de Problemas

### As fotos não aparecem
- ✅ Certifique-se que executou o script SQL no Supabase
- ✅ Verifique se o imóvel foi guardado antes de adicionar fotos
- ✅ Aguarde o upload completo (não feche a página)
- ✅ Verifique se as fotos têm menos de 5MB

### O vídeo não aparece
- ✅ Certifique-se que usou o formato de URL correto: `https://www.youtube.com/embed/ID`
- ✅ Não use o URL normal do YouTube (`watch?v=`)
- ✅ Verifique se o vídeo é público (não privado)

### O mapa não aparece
- ✅ Use o URL de incorporação do Google Maps (começa com `maps/embed`)
- ✅ Não use o URL normal de partilha do Google Maps

### Erro ao publicar o site
- ✅ Certifique-se que não há erros de compilação
- ✅ Verifique se todas as traduções estão completas
- ✅ Execute o script SQL no Supabase antes de publicar

---

## 📞 Suporte

Se tiver problemas, verifique:
1. Se executou o script SQL no Supabase
2. Se as variáveis de ambiente estão configuradas
3. Se está a usar os formatos corretos de URL para vídeos e mapas

---

## 🎯 Checklist Rápida

Antes de publicar um imóvel:
- [ ] Título em português e inglês preenchidos
- [ ] Descrição em português e inglês preenchidas
- [ ] Preço, área e localização corretos
- [ ] Pelo menos 3-5 fotos adicionadas
- [ ] Primeira foto é a melhor (será a capa)
- [ ] Vídeo adicionado (se disponível)
- [ ] Mapa adicionado
- [ ] Imóvel marcado como "Destaque" se for importante
