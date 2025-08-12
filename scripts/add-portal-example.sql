-- Adicionar exemplo de dados para o portal da empresa
INSERT INTO portal_empresa (empresa, data_hora, token, pdf, status_servico) 
VALUES (
  'Tech Solutions LTDA',
  NOW(),
  'TSL2024001',
  'https://example.com/orcamento-tech-solutions.pdf',
  'em andamento'
);

INSERT INTO portal_empresa (empresa, data_hora, token, pdf, status_servico) 
VALUES (
  'Digital Marketing Pro',
  NOW() - INTERVAL '7 days',
  'DMP2024002',
  NULL,
  'orçamento'
);

INSERT INTO portal_empresa (empresa, data_hora, token, pdf, status_servico) 
VALUES (
  'StartupXYZ',
  NOW() - INTERVAL '15 days',
  'SXZ2024003',
  'https://example.com/orcamento-startupxyz.pdf',
  'entregue'
);
