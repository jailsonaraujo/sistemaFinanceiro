// cadastro das receitas***********************************************
const db_Receitas=()=>{
  const listCadastro={
    descricao:document.getElementById('descricao').value,
    valor:document.getElementById('valor').value,
    data:document.getElementById('data').value
  }

  const db_cadastro=JSON.parse(localStorage.getItem('db_receitas'))??[];
  db_cadastro.push(listCadastro)

  localStorage.setItem('db_receitas',JSON.stringify(db_cadastro))
}

document.getElementById('btnSalvarReceita').addEventListener('click', ()=>{
  db_Receitas()
  mostrarSaldo()
  mostrarDados()
})

// mostrar saldo no painel
const mostrarSaldo=()=>{
  const db_cadastro=JSON.parse(localStorage.getItem('db_receitas'));
  const painelSaldo=document.querySelector('.saldos');
  const totalDespesas=document.getElementById('total-receitas')
  let soma=0;
  db_cadastro.forEach((valor)=>{
    soma+=parseInt(valor.valor)
  })
  painelSaldo.innerHTML='R$ '+soma;
  totalDespesas.innerHTML='R$ '+soma;
}
mostrarSaldo()

// mostrar dados na tabela de receitas
const mostrarDados=()=>{
  const db_cadastro=JSON.parse(localStorage.getItem('db_receitas'))
  const tbody=document.querySelector('.table-receitas tbody')
  
  // Eliminar linhas para nao se repetirem
  const eliminarTr=document.querySelectorAll('.table-receitas>tbody tr')
  eliminarTr.forEach(linhaTr=>linhaTr.parentNode.removeChild(linhaTr))

  db_cadastro.forEach((dados)=>{
    const tr=document.createElement('tr')
    tr.innerHTML='<tr><td>'+dados.data+'</td><td>'+dados.descricao+'</td><td>'+dados.valor+'</td></tr>'
    tbody.appendChild(tr)
  })
}
mostrarDados()


// cadastro das despesas***********************************************
const db_despesa=()=>{
  const listCadastroDespesa={
    descricao:document.getElementById('descricaoDespesa').value,
    valor:document.getElementById('valorDespesa').value,
    data:document.getElementById('dataDespesa').value
  }

  const db_cadastro=JSON.parse(localStorage.getItem('db_despesa'))??[];
  db_cadastro.push(listCadastroDespesa)

  localStorage.setItem('db_despesa',JSON.stringify(db_cadastro))
}

document.getElementById('btnSalvarDespesa').addEventListener('click', ()=>{
  db_despesa()
  mostrarDespesa()
  mostrarDadosDespesa()
})

// mostrar saldo no painel
const descontarSaldoAtual=()=>{
  const saldoAtual=document.querySelector('.saldos').innerHTML;

}

const mostrarDespesa=()=>{
  const db_cadastro=JSON.parse(localStorage.getItem('db_despesa'));
  const painelDespesas=document.querySelector('.despesas');
  let soma=0;
  db_cadastro.forEach((valor)=>{
    soma+=parseInt(valor.valor)
  })
  painelDespesas.innerHTML='R$ '+soma;
  console.log(soma)
}
mostrarDespesa()

// mostrar dados na tabela de receitas
const mostrarDadosDespesa=()=>{
  const db_cadastro=JSON.parse(localStorage.getItem('db_despesa'))
  const tbody=document.querySelector('.table-despesas tbody')
  
  // Eliminar linhas para nao se repetirem
  const eliminarTr=document.querySelectorAll('.table-despesas>tbody tr')
  eliminarTr.forEach(linhaTr=>linhaTr.parentNode.removeChild(linhaTr))

  db_cadastro.forEach((dados)=>{
    const tr=document.createElement('tr')
    tr.innerHTML='<tr><td>'+dados.data+'</td><td>'+dados.descricao+'</td><td>'+dados.valor+'</td></tr>'
    tbody.appendChild(tr)
  })
}
mostrarDadosDespesa()