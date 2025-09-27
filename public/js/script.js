// Enhanced JavaScript for better user experience
(() => {
    'use strict'
  
    // Form validation with enhanced UX
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          
          // Focus on first invalid field
          const firstInvalidField = form.querySelector(':invalid')
          if (firstInvalidField) {
            firstInvalidField.focus()
          }
        } else {
          // Add loading state to submit button
          const submitBtn = form.querySelector('button[type="submit"]')
          if (submitBtn && !submitBtn.disabled) {
            submitBtn.disabled = true
            const originalText = submitBtn.innerHTML
            submitBtn.innerHTML = '<span class="loading"></span> Processing...'
            
            // Reset button after 3 seconds if form is still on page
            setTimeout(() => {
              if (submitBtn) {
                submitBtn.disabled = false
                submitBtn.innerHTML = originalText
              }
            }, 3000)
          }
        }
  
        form.classList.add('was-validated')
      }, false)
    })

    // Image lazy loading for better performance
    const images = document.querySelectorAll('img[data-src]')
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert')
    alerts.forEach(alert => {
      setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alert)
        if (bsAlert) {
          bsAlert.close()
        }
      }, 5000)
    })

    // Add hover effects to cards
    const cards = document.querySelectorAll('.listing-card')
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)'
      })
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)'
      })
    })

    // Price formatting
    const priceElements = document.querySelectorAll('.price')
    priceElements.forEach(element => {
      const price = parseInt(element.textContent.replace(/[^0-9]/g, ''))
      if (!isNaN(price)) {
        element.textContent = `₹${price.toLocaleString('en-IN')}`
      }
    })

    console.log('🚀 Travia JavaScript loaded successfully!')
  })()