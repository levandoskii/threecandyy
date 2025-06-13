let carrinho = [];

function alterarQuantidade(btn, valor) {
  const span = btn.parentElement.querySelector("span");
  let qtd = parseInt(span.textContent);
  qtd = Math.max(0, qtd + valor);
  span.textContent = qtd;
}

function adicionar(btn) {
  const div = btn.parentElement;
  const nome = div.dataset.nome;
  const preco = parseFloat(div.dataset.preco);
  const qtd = parseInt(div.querySelector("span").textContent);
  if (qtd > 0) {
    carrinho.push({ nome, qtd, preco });
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  const lista = document.getElementById("itens");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `- ${item.nome}: ${item.qtd} unidade(s)`;
    lista.appendChild(li);
    total += item.qtd * item.preco;
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function pagar() {
  const dados = JSON.parse(localStorage.getItem("dadosUsuario") || sessionStorage.getItem("dadosUsuario"));
  let msg = "Olá, tenho um pedido:\n";
  let total = 0;

  carrinho.forEach(item => {
    msg += `- ${item.nome}: ${item.qtd} unidade(s)\n`;
    total += item.qtd * item.preco;
  });

  msg += `Total: R$ ${total.toFixed(2)}\n`;
  msg += `Nome: ${dados.nome} ${dados.sobrenome}\n`;
  msg += `Turma: ${dados.turma}\n`;
  msg += `Tipo de entrega: ${dados.tipoEntrega}`;

  const url = `https://wa.me/5541996597922?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}
