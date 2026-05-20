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
 