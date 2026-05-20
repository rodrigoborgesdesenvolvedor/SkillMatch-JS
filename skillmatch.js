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