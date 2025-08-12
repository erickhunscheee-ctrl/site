-- Criando tabelas para avaliações e portal da empresa
-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(255) NOT NULL,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  texto TEXT NOT NULL,
  estrelas INTEGER CHECK (estrelas >= 1 AND estrelas <= 5) NOT NULL
);

-- Tabela do portal da empresa
CREATE TABLE IF NOT EXISTS portal_empresa (
  id SERIAL PRIMARY KEY,
  empresa VARCHAR(255) NOT NULL,
  data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  token VARCHAR(255) UNIQUE NOT NULL,
  pdf TEXT,
  status_servico VARCHAR(50) CHECK (status_servico IN ('aberto', 'orçamento', 'em andamento', 'entregue')) DEFAULT 'aberto'
);
