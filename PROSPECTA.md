# Prospecta online

Sistema privado em `/prospecta/`, publicado junto ao site existente. A página principal e o webhook WhatsApp existente são preservados.

## Uso

- O proprietário recebe um link privado de ativação com chave no fragmento. Cria sua própria senha (mínimo 12 caracteres); o link deixa de funcionar depois da criação. A senha é guardada como hash scrypt com salt aleatório.
- Acesso posterior em `/prospecta/login.html`, com sessão de 12 horas, cookie HttpOnly/Secure/SameSite=Strict e saída que revoga a sessão. Há limite de tentativas por IP. Não há cadastro público nem recuperação de senha por email.
- Google Maps abre pesquisa assistida por cidade e segmento; cadastro manual. OpenStreetMap importa resultados de fontes públicas disponíveis. Instagram pode vir da fonte ou ser cadastrado, com verificação manual de atividade.
- Mensagens são rascunhos individuais. O usuário confirma o envio no seu WhatsApp Business pelo link wa.me; não há integração paga de envio nesta versão online.
- Configurações permite baixar backup JSON privado da base.

## Armazenamento e segurança

Netlify Functions atende `/prospecta/api/*` e guarda estado em Netlify Blobs, store privado `prospecta-private-crm`, com consistência forte. Gravações condicionais por ETag evitam sobrescritas entre dispositivos. Base limitada a 2.000 contatos, atividade aos últimos 100 registros. Não há dependência do servidor local para acessar contatos online.

É usada a variável privada de produção `PROSPECTA_BRIDGE_KEY` já configurada. A chave de ativação é HMAC-SHA256 dessa variável com o contexto `prospecta-owner-setup-v1`. Nunca publique a variável nem o link de ativação. A importação inicial `/bootstrap` exige essa chave como bearer, não sobrescreve base existente e é desabilitada após criação do acesso. Nenhum token de envio Meta, App Secret, senha ou dado de leads entra nos arquivos públicos.

Previews sem a variável de produção retornam 503 na API. Segredos permanecem restritos à produção. As requisições de escrita exigem header próprio e origem compatível. Arquivos da interface são públicos; todos os dados do CRM exigem sessão.

Hospedagem usa recursos do plano Netlify existente, sujeitos às cotas da conta. Não foram contratados planos ou serviços pagos. Ampliação de uso pode exigir rever limites. O sistema é para um único proprietário, não uma plataforma multiusuário.

## Validação

`npm ci`, `npm run build`, `node --test test/*.test.mjs` e `npx netlify-cli functions:build --src netlify/functions --functions .netlify/functions-built`.

Os testes verificam autenticação, isolamento, CSRF, importação única, limite de login, saída, concorrência, Instagram e preservação do gateway assinado do WhatsApp.

Se perder a senha, a recuperação requer acesso administrativo ao Netlify; não remova o estado `crm/state`. Mantenha backups dos contatos. O conteúdo do store não fica no repositório Git.
