// ============================================================
//  SkillMatch JS - Simulador de Compatibilidade com Vaga
// ============================================================
 
const promptSync = require("prompt-sync");
const prompt = promptSync({ sigint: true });
 
class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }
 
  exibirResumo() {
    return `${this.cargo} em ${this.empresa} (${this.modalidade}) - R$${this.salario}`;
  }
}
 
class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }
 
  exibirNivel() {
    return `Nivel: ${this.nivel}`;
  }
}
 
const vagas = [
  new VagaFrontEnd(1, "TechStart",    "Dev Front-End Junior",  ["JavaScript", "GitHub", "Logica de Programacao"],  2800, "Remoto",     "Junior"),
  new VagaFrontEnd(2, "CodeLab",      "Estagio Front-End",     ["JavaScript", "Kanban", "GitHub"],                 1800, "Hibrido",    "Estagio"),
  new VagaFrontEnd(3, "WebSolutions", "Programador JS Junior", ["JavaScript", "Arrays", "Objetos", "Funcoes"],     3000, "Presencial", "Junior"),
  new VagaFrontEnd(4, "DevAgency",    "Front-End Trainee",     ["JavaScript", "GitHub", "Arrays", "CSS", "HTML"],  2200, "Remoto",     "Trainee"),
];
 
function criarContador() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}
 
const contar = criarContador();
 
function buscarVagas() {
  return new Promise(resolve => {
    setTimeout(() => resolve(vagas), 1000);
  });
}
 
async function iniciarSistema() {
  console.log("\n=== SkillMatch JS ===\n");
 
  console.log("[Servidor] Carregando vagas...");
  const vagasCarregadas = await buscarVagas();
  console.log("Vagas carregadas!");
  vagasCarregadas.forEach(v => console.log(`  - ${v.empresa}: ${v.cargo}`));
 
  const habilidades = vagasCarregadas.reduce((lista, vaga) => {
    vaga.requisitos.forEach(req => {
      if (!lista.includes(req)) lista.push(req);
    });
    return lista;
  }, []);
 
  const nome = prompt("\nDigite o nome do candidato: ").trim();
 
  console.log("\nHabilidades mencionadas no currículo:");
  habilidades.forEach((h, i) => console.log(`  ${i + 1}. ${h}`));
  console.log("  0. Sair");
 
  let selecionadas;
 
  while (true) {
    const entrada = prompt("\nDigite os numeros das habilidades (ex: 1,3,5): ").trim();
 
    if (entrada === "0") {
      console.log("Encerrando o sistema.");
      process.exit(0);
    }
 
    const numeros = entrada.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    const invalidos = numeros.filter(n => n < 1 || n > habilidades.length);
 
    if (invalidos.length > 0) {
      console.log(`Selecione apenas de 1 a ${habilidades.length}`);
      continue;
    }
 
    selecionadas = numeros.map(n => habilidades[n - 1]);
    break;
  }
 
  const candidato = {
    nome: nome || "Candidato",
    area: "Front-End",
    habilidades: selecionadas,
  };
 
  console.log(`\nCandidato  : ${candidato.nome}`);
  console.log(`Habilidades: ${candidato.habilidades.join(", ") || "Nenhuma"}`);
 
  const resultados = vagasCarregadas.map(vaga => {
    contar();
 
    const encontradas = vaga.requisitos.filter(req => candidato.habilidades.includes(req));
    const faltantes = vaga.requisitos.filter(req => !candidato.habilidades.includes(req));
    const percentual = Math.round((encontradas.length / vaga.requisitos.length) * 100);
 
    let classificacao;
    if (percentual >= 80) classificacao = "Alta compatibilidade";
    else if (percentual >= 50) classificacao = "Media compatibilidade";
    else classificacao = "Baixa compatibilidade";
 
    return { vaga, percentual, classificacao, encontradas, faltantes };
  });
 
  console.log("\n=== Analise por Vaga ===");
 
  resultados.forEach(({ vaga, percentual, classificacao, encontradas, faltantes }) => {
    console.log(`\nEmpresa    : ${vaga.empresa}`);
    console.log(`Cargo      : ${vaga.cargo}`);
    console.log(vaga.exibirNivel());
    console.log(vaga.exibirResumo());
    console.log(`Compat.    : ${percentual}% - ${classificacao}`);
    console.log(`Encontradas: ${encontradas.join(", ") || "Nenhuma"}`);
    console.log(`Faltantes  : ${faltantes.join(", ") || "Nenhuma"}`);
    console.log("-".repeat(45));
  });
 
  const melhor = resultados.reduce((a, b) => a.percentual >= b.percentual ? a : b);

  console.log("\n=== Vaga Mais Compativel ===");
  console.log(`${melhor.vaga.empresa} - ${melhor.vaga.cargo}: ${melhor.percentual}%`);
 
  const perfeitas = vagasCarregadas.filter(vaga =>
    vaga.requisitos.every(req => candidato.habilidades.includes(req))
  );
 
  if (perfeitas.length > 0) {
    console.log(`O(A) candidato(a) atende 100% dos requisitos de: ${perfeitas.map(v => v.empresa).join(", ")}`);
  } else {
    console.log("O(A) candidato(a) ainda nao atende 100% dos requisitos de nenhuma vaga.");
  }
 
  const faltamEstudar = resultados.reduce((lista, r) => {
    r.faltantes.forEach(h => { if (!lista.includes(h)) lista.push(h); });
    return lista;
  }, []);
 
  console.log("\n=== Recomendacao de Estudo ===");
  if (faltamEstudar.length === 0) {
    console.log("Parabens! o candidato possui todas as habilidades exigidas.");
  } else {
    console.log(`Habilidades: ${faltamEstudar.join(", ")}`);
  }
 
  function exibirMensagemFinal(nome) {
    if (faltamEstudar.length === 0) {
      console.log(`Sem recomendações de Estudo.\n`);
    } else {
      console.log(`Recomende a revisão das habilidades acima ao(a) candidato(a) ${nome}. Sujira a implementação de um plano de estudos.\n`);
    }
  }
 
  function finalizarAnalise(nomeCandidato, callback) {
    console.log("\nAnalise finalizada.");
    callback(nomeCandidato);
  }
 
  finalizarAnalise(candidato.nome, exibirMensagemFinal);
 
  console.log(`Total de vagas analisadas: ${contar() - 1}`);
}

iniciarSistema();