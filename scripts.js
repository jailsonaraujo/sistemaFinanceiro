// SCRIPTS RECEITAS *****************************************************************************
// variaveis globais receitas
const getDadosreceitas=JSON.parse(localStorage.getItem('db_receitas'))??[];
const btnSalvarReceita=document.getElementById('btnSalvarReceita');
const totalReceitas=document.getElementById('total-receitas');
var somaSaldoTotal;

// função de cadastro dos dados no localstorage
const cadastrarDadosReceitas=()=>{
  const listDadosCadastro={
    descricao:document.getElementById('descricao').value,
    valor:document.getElementById('valor').value,
    data:document.getElementById('data').value
  }
  getDadosreceitas.push(listDadosCadastro)
  localStorage.setItem('db_receitas',JSON.stringify(getDadosreceitas));
}
btnSalvarReceita.addEventListener('click', function(){
  cadastrarDadosReceitas();
  exibirDadosTabela()
  mostrarSaldoTotal()
})

// função para exibir dados na tabela
const exibirDadosTabela=()=>{
  const elementTr=document.querySelectorAll('.table-receitas>tbody>tr');
  elementTr.forEach(linhaTr=>linhaTr.parentNode.removeChild(linhaTr))

  getDadosreceitas.forEach((dadosReceitas, keyReceitas)=>{
    const tr=document.createElement('tr');

    tr.innerHTML='<td>'+dadosReceitas.descricao+'</td><td>'+dadosReceitas.data+'</td><td>'+dadosReceitas.valor+
    '</td><td><button class="btnExcluir" id="excluir-'+keyReceitas+'">Excluir</button></td>'+
    '<td><button class="btnEditar" id="editar-'+keyReceitas+'">Editar</button></td>'
    tr.style.color='#63b4f4';
    
    document.querySelector('.table-receitas>tbody').appendChild(tr)
  })
}
exibirDadosTabela()

// função mostrar saldo total
const mostrarSaldoTotal=()=>{
  somaSaldoTotal=0;
  getDadosreceitas.forEach((valor)=>{
    somaSaldoTotal+=parseFloat(valor.valor);
  })
  totalReceitas.innerHTML='R$ '+somaSaldoTotal.toFixed(2);
}
mostrarSaldoTotal()

// função excluir dados
const editarDados=(index)=>{
  const getdados=getDadosreceitas[index]
  document.getElementById('descricao').value=getdados.descricao
  document.getElementById('valor').value=getdados.valor
  document.getElementById('data').value=getdados.data
  document.getElementById('descricao').dataset.index=getdados.index
}

const ecluirReceitas=(e)=>{
  if(e.target.type=='submit'){
    const [acao,index] = e.target.id.split('-')
    
    if(acao=='editar'){
      editarDados(index)
    }else{
      const excDados=getDadosreceitas.splice(index,1)

      localStorage.setItem('db_receitas',JSON.stringify(getDadosreceitas));
      exibirDadosTabela()
    }
  }
}
document.querySelector('.table-receitas>tbody').addEventListener('click',ecluirReceitas)
// SCRIPTS DESPESAS *****************************************************************************
// variaveis globais receitas
const getDadosDespesas=JSON.parse(localStorage.getItem('db_despesas'))??[];
const btnSalvarDespesas=document.getElementById('btnSalvarDespesa');
const totalDespesas=document.getElementById('total-despesas');
const despesasAtual=document.querySelector('#despesasAtual');
var somaTotalDespesas;

const cadastrardadosDespesas=()=>{
  const listDadosDespesa={
    descricao:document.getElementById('descricaoDespesa').value,
    valor:document.getElementById('valorDespesa').value,
    data:document.getElementById('dataDespesa').value
  }
  getDadosDespesas.push(listDadosDespesa);
  localStorage.setItem('db_despesas',JSON.stringify(getDadosDespesas));
}
btnSalvarDespesas.addEventListener('click',function(){
  cadastrardadosDespesas();
  exibirDadosDespesas()
  valorTotalDespesas()
  valorAtualReceitas()
})

// função para exibir dados na tabela Despesas
const exibirDadosDespesas=()=>{
  const trLinDespesas=document.querySelectorAll('.table-despesas>tbody tr');
  trLinDespesas.forEach(trLinDesp=>trLinDesp.parentNode.removeChild(trLinDesp));

  getDadosDespesas.forEach((dadosDespesas, keyDespesas)=>{
    const trDespesas=document.createElement('tr');
    trDespesas.innerHTML='<td>'+dadosDespesas.descricao+'</td>'+
    '<td>'+dadosDespesas.data+'</td><td>'+dadosDespesas.valor+
    '</td><td><button class="btnExcluirDespesas" id="excluir-'+keyDespesas+'">Excluir</td>'

    trDespesas.style.color='#f00'
    document.querySelector('.table-despesas>tbody').appendChild(trDespesas)
  })
}
exibirDadosDespesas()

// mostrar valor total despesas
const valorTotalDespesas=()=>{
  somaTotalDespesas=0;
  getDadosDespesas.forEach((valorDespesas)=>{
    somaTotalDespesas+=parseFloat(valorDespesas.valor);
  })
  totalDespesas.innerHTML='R$ '+somaTotalDespesas.toFixed(2);
  despesasAtual.innerHTML='R$ '+somaTotalDespesas.toFixed(2);
}
valorTotalDespesas()



// função de descontar valores atual das receitas
const saldoAtual=document.querySelector('#saldoAtual')

function valorAtualReceitas(){
  const desconto=parseFloat(somaSaldoTotal)-parseFloat(somaTotalDespesas)
  saldoAtual.innerHTML='R$ '+desconto.toFixed(2)
}
valorAtualReceitas()

// excluir despesas
const excluirDespesas=(e)=>{
  if(e.target.type=='submit'){
    const [acao, index]=e.target.id.split('-');
    if(acao=='excluir'){
      const getDespesas=getDadosDespesas.splice(index,1);

      localStorage.setItem('db_despesas',JSON.stringify(getDadosDespesas));
      exibirDadosDespesas()
    }
  }
  
}
document.querySelector('.table-despesas>tbody').addEventListener('click',excluirDespesas);