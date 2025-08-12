-- Inserir uma avaliação de exemplo
INSERT INTO avaliacoes (usuario, texto, estrelas, data) 
VALUES (
  'João Silva',
  'Excelente serviço! A equipe foi muito profissional e entregou o projeto no prazo. Recomendo para qualquer empresa que precise de desenvolvimento web de qualidade.',
  5,
  NOW()
);

INSERT INTO avaliacoes (usuario, texto, estrelas, data) 
VALUES (
  'Maria Santos',
  'Muito satisfeita com o resultado. O design ficou moderno e funcional. Atendimento foi ótimo do início ao fim.',
  5,
  NOW() - INTERVAL '2 days'
);

INSERT INTO avaliacoes (usuario, texto, estrelas, data) 
VALUES (
  'Carlos Oliveira',
  'Bom trabalho, mas poderia ter mais comunicação durante o desenvolvimento. No final ficou como esperado.',
  4,
  NOW() - INTERVAL '5 days'
);
