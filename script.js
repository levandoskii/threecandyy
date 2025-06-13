// Salvar dados do usuário
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const sobrenome = document.getElementById("sobrenome").value;
      const turma = document.getElementById("turma").value;
      const tipoEntrega = document.getElementById("tipoEntrega").value;
      const manterLogado = document.getElementById("manterLogado").checked;

      const dados = {
        nome,
        sobrenome,
        turma,
        tipoEntrega
      };

      if (manterLogado) {
        localStorage.setItem("usuario", JSON.stringify(dados));
      } else {
        sessionStorage.setItem("usuario", JSON.stringify(dados));
      }

      window.location.href = "home.html";
    });
  }

  // Verificar se há dados salvos
  const usuario = JSON.parse(localStorage.getItem("usuario") || sessionStorage.getItem("usuario"));
  if (usuario && window.location.pathname.includes("home.html")) {
    document.querySelector(".mensagem-boas-vindas")?.insertAdjacentHTML("afterbegin", `<p>Olá, ${usuario.nome}!</p>`);
  }
});

// Navegar para o catálogo
function irParaCatalogo() {
  window.location.href = "catalogo.html";
}

// Carrinho
const carrinho = [];
function alterarQuantidade(id, valor) {
  const span = document.getElementById(`qtd-${id}`);
  let qtd = parseInt(span.textContent) + valor;
  if (qtd < 0) qtd = 0;
  span.textContent = qtd;
}

function adicionarAoCarrinho(produto, preco, idSpan) {
  const qtd = parseInt(document.getElementById(idSpan).textContent);
  if (qtd > 0) {
    carrinho.push({ produto, preco, qtd });
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  const lista = document.getElementById("itensCarrinho");
  const total = document.getElementById("precoTotal");
  lista.innerHTML = "";

  let precoFinal = 0;
  carrinho.forEach(item => {
    lista.innerHTML += `<li>${item.produto}: ${item.qtd} unidade(s) - R$ ${(item.preco * item.qtd).toFixed(2)}</li>`;
    precoFinal += item.preco * item.qtd;
  });

  total.textContent = `Total: R$ ${precoFinal.toFixed(2)}`;
}

function finalizarCompra() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || sessionStorage.getItem("usuario"));
  if (!usuario) {
    alert("Usuário não identificado.");
    return;
  }

  let mensagem = `Olá, tenho um pedido:\n`;
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `- ${item.produto}: ${item.qtd} unidade(s)\n`;
    total += item.preco * item.qtd;
  });

  mensagem += `Total: R$ ${total.toFixed(2)}\n`;
  mensagem += `Nome: ${usuario.nome} ${usuario.sobrenome}\n`;
  mensagem += `Turma: ${usuario.turma}\n`;
  mensagem += `Tipo de entrega: ${usuario.tipoEntrega}`;

  const url = `https://wa.me/5541996597922?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
