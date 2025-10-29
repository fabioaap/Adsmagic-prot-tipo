// 🤖 SCRIPT DE DIAGNÓSTICO AUTOMÁTICO
// Cole isso no Console do DevTools (F12) em http://127.0.0.1:5177

(function() {
  console.clear();
  console.log('%c🔍 DIAGNÓSTICO AUTOMÁTICO - QI 200', 'font-size:16px; color: #2563eb; font-weight: bold;');
  console.log('%c' + '='.repeat(60), 'color: #64748b;');
  
  // ============================================
  // SEÇÃO 1: ESTRUTURA HTML
  // ============================================
  console.log('\n%c📦 SEÇÃO 1: ESTRUTURA HTML', 'font-size:14px; color: #0891b2; font-weight: bold;');
  
  const checks = {
    'app-shell': document.querySelector('.app-shell'),
    'app-sidebar': document.querySelector('.app-sidebar'),
    'header': document.querySelector('.header'),
    'app-main': document.querySelector('.app-main'),
    'summary-cards (14x)': { length: document.querySelectorAll('.summary-card').length, expected: 14 },
    'summary-grid': document.querySelector('.summary-grid'),
  };
  
  Object.entries(checks).forEach(([key, value]) => {
    if (typeof value === 'object' && 'length' in value && 'expected' in value) {
      const ok = value.length === value.expected ? '✅' : '⚠️';
      console.log(`${ok} ${key}: ${value.length}/${value.expected}`);
    } else {
      const ok = value ? '✅' : '❌';
      console.log(`${ok} ${key}`);
    }
  });
  
  // ============================================
  // SEÇÃO 2: CSS APLICADO (COMPUTED STYLES)
  // ============================================
  console.log('\n%c🎨 SEÇÃO 2: CSS APLICADO', 'font-size:14px; color: #059669; font-weight: bold;');
  
  const card = document.querySelector('.summary-card');
  if (card) {
    const styles = getComputedStyle(card);
    console.log('%cSummary Card:', 'font-weight: bold; color: #1e293b;');
    console.log(`  • Padding: ${styles.padding}`);
    console.log(`  • Border-radius: ${styles.borderRadius}`);
    console.log(`  • Background: ${styles.backgroundColor}`);
    console.log(`  • Border: ${styles.border}`);
    console.log(`  • Box-shadow: ${styles.boxShadow}`);
    console.log(`  • Width: ${styles.width}`);
    console.log(`  • Height: ${styles.height}`);
  } else {
    console.log('❌ Card não encontrado');
  }
  
  // ============================================
  // SEÇÃO 3: TAILWIND CSS
  // ============================================
  console.log('\n%c⚙️ SEÇÃO 3: TAILWIND CSS', 'font-size:14px; color: #7c3aed; font-weight: bold;');
  
  // Verificar classes Tailwind no DOM
  const tailwindClasses = [
    'lg:grid-cols-4',
    'lg:grid-cols-2',
    'rounded-3xl',
    'border',
    'border-slate-200',
    'bg-white',
    'p-6',
  ];
  
  const summary = document.querySelector('.summary-grid');
  if (summary) {
    const classList = summary.className;
    console.log(`Summary Grid classes: ${classList}`);
    tailwindClasses.forEach(cls => {
      const hasClass = classList.includes(cls.replace(':', '\\:'));
      console.log(`  ${hasClass ? '✅' : '⚠️'} ${cls}`);
    });
  }
  
  // ============================================
  // SEÇÃO 4: base.css
  // ============================================
  console.log('\n%c📄 SEÇÃO 4: base.css', 'font-size:14px; color: #ea580c; font-weight: bold;');
  
  const baseClasses = [
    'summary-card',
    'summary-grid',
    'card-shadow',
    'app-shell',
    'app-sidebar',
    'header',
    'app-main',
  ];
  
  const styleSheets = document.styleSheets;
  baseClasses.forEach(cls => {
    let found = false;
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const rules = styleSheets[i].cssRules || [];
        for (let j = 0; j < rules.length; j++) {
          if (rules[j].selectorText && rules[j].selectorText.includes(`.${cls}`)) {
            found = true;
            break;
          }
        }
        if (found) break;
      } catch (e) {
        // CORS issue, skip
      }
    }
    console.log(`  ${found ? '✅' : '❌'} .${cls}`);
  });
  
  // ============================================
  // SEÇÃO 5: DIAGNÓSTICO DE ERROS
  // ============================================
  console.log('\n%c🚨 SEÇÃO 5: DIAGNÓSTICO DE ERROS', 'font-size:14px; color: #dc2626; font-weight: bold;');
  
  // Verificar se há elementos sem classes críticas
  const mainContent = document.querySelector('.app-main');
  if (mainContent) {
    const computedMain = getComputedStyle(mainContent);
    console.log('Main element:');
    console.log(`  • Display: ${computedMain.display}`);
    console.log(`  • Padding-top: ${computedMain.paddingTop}`);
    console.log(`  • Margin-left: ${computedMain.marginLeft}`);
  }
  
  // ============================================
  // SEÇÃO 6: RECOMENDAÇÕES
  // ============================================
  console.log('\n%c💡 SEÇÃO 6: RECOMENDAÇÕES', 'font-size:14px; color: #2563eb; font-weight: bold;');
  
  const hasAllClasses = checks['app-shell'] && checks['app-sidebar'] && checks['header'] && checks['app-main'];
  const hasAllCards = checks['summary-cards (14x)'].length === 14;
  
  if (!hasAllClasses) {
    console.log('❌ CRÍTICO: Layout wrapper está faltando!');
    console.log('   → Verificar: Layout.tsx foi importado em App.tsx?');
    console.log('   → Verificar: Dashboard está usando <Layout> wrapper?');
  } else if (!hasAllCards) {
    console.log('⚠️ AVISO: Nem todos os 14 cards foram encontrados');
    console.log('   → Verificar: Dashboard.tsx renderizou todos os cards?');
  } else {
    console.log('✅ ESTRUTURA: Tudo parece estar correto!');
    console.log('   → Próximo: Verificar cores e espaçamento pixel-a-pixel');
  }
  
  console.log('\n%c' + '='.repeat(60), 'color: #64748b;');
  console.log('%c✅ Diagnóstico completo!', 'font-size:12px; color: #059669;');
})();
