import {
  type Barber,
  PrismaClient,
  type Service,
  type User,
} from '@/generated/prisma'

const prisma = new PrismaClient()

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

async function seedDatabase() {
  try {
    // await prisma.review.deleteMany()
    // await prisma.booking.deleteMany()
    // await prisma.service.deleteMany()
    // await prisma.barber.deleteMany()
    // await prisma.barberShop.deleteMany()
    // await prisma.user.deleteMany()

    const barberShopImages = [
      'https://barbershops.s3.us-east-2.amazonaws.com/barbershops/barbershop-1.jpg',
      'https://barbershops.s3.us-east-2.amazonaws.com/barbershops/barbershop-2.jpg',
      'https://barbershops.s3.us-east-2.amazonaws.com/barbershops/barbershop-3.jpg',
      'https://barbershops.s3.us-east-2.amazonaws.com/barbershops/barbershop-4.jpg',
      'https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png',
      'https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png',
      'https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png',
      'https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png',
      'https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png',
      'https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png',
      'https://utfs.io/f/3bcf33fc-988a-462b-8b98-b811ee2bbd71-17k.png',
      'https://utfs.io/f/5788be0e-2307-4bb4-b603-d9dd237950a2-17l.png',
      'https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png',
      'https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png',
      'https://utfs.io/f/a55f0f39-31a0-4819-8796-538d68cc2a0f-17o.png',
      'https://utfs.io/f/5c89f046-80cd-4443-89df-211de62b7c2a-17p.png',
      'https://utfs.io/f/23d9c4f7-8bdb-40e1-99a5-f42271b7404a-17q.png',
      'https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png',
      'https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png',
      'https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png',
    ]

    const serviceImages = [
      'https://barbershops.s3.us-east-2.amazonaws.com/services/hair-service.jpg',
      'https://barbershops.s3.us-east-2.amazonaws.com/services/beard-service.jpg',
      'https://barbershops.s3.us-east-2.amazonaws.com/services/pezinho-service.jpg',
      'https://barbershops.s3.us-east-2.amazonaws.com/services/eyebrow-service.jpg',
      'https://barbershops.s3.us-east-2.amazonaws.com/services/hidration-service.jpg',
      'https://barbershops.s3.us-east-2.amazonaws.com/services/smoothing-service.jpg',
    ]

    const barberShopNames = [
      'Barbearia Retrô',
      'Corte Nobre',
      'Navalha Afiada',
      'O Refúgio do Cavalheiro',
      'Estilo Raiz',
      'Barba de Respeito',
      'Tesoura de Ouro',
      'Visual Prime',
      'Clube do Barbeiro',
      'Tradição & Estilo',
    ]

    const addresses = [
      'Rua do Cavaleiro, 100 - Centro, São Paulo - SP, 01234-567',
      'Avenida das Tesouras, 250 - Jardins, São Paulo - SP, 01234-567',
      'Praça da Barba, 300 - Vila Nova, São Paulo - SP, 01234-567',
      'Alameda do Estilo, 450 - Bairro Alto, São Paulo - SP, 01234-567',
      'Estrada do Corte, 600 - São Lucas, São Paulo - SP, 01234-567',
      'Rua da Navalha, 700 - Liberdade, São Paulo - SP, 01234-567',
      'Avenida Clássica, 850 - Moema, São Paulo - SP, 01234-567',
      'Praça do Barbeiro, 900 - Santana, São Paulo - SP, 01234-567',
      'Rua Urbana, 1000 - Pinheiros, São Paulo - SP, 01234-567',
      'Avenida do Visual, 1200 - Ipanema, São Paulo - SP, 01234-567',
    ]

    const phones = [
      '(11) 91234-5678',
      '(11) 92345-6789',
      '(11) 93456-7890',
      '(11) 94567-8901',
      '(11) 95678-9012',
      '(11) 96789-0123',
      '(11) 97890-1234',
      '(11) 98901-2345',
      '(11) 99012-3456',
      '(11) 90123-4567',
    ]

    const services = [
      {
        name: 'Corte Clássico',
        description: 'Um corte atemporal que combina elegância e sofisticação.',
        price: 6000, // 60.00 BRL
        imageUrl: serviceImages[0],
        duration: 30,
      },
      {
        name: 'Barba',
        description:
          'Modelagem precisa para uma barba impecável e cheia de personalidade.',
        price: 4000, // 40.00 BRL
        imageUrl: serviceImages[1],
        duration: 20,
      },
      {
        name: 'Pézinho',
        description: 'Acabamento detalhado para um visual renovado e moderno.',
        price: 1500, // 15.00 BRL
        imageUrl: serviceImages[2],
        duration: 15,
      },
      {
        name: 'Sobrancelha Definida',
        description: 'Design que realça sua expressão com precisão artesanal.',
        price: 2000, // 20.00 BRL
        imageUrl: serviceImages[3],
        duration: 10,
      },
      {
        name: 'Hidratação Viking',
        description:
          'Tratamento profundo para cabelo e barba, com óleos naturais.',
        price: 3000, // 30.00 BRL
        imageUrl: serviceImages[4],
        duration: 25,
      },
      {
        name: 'Alisamento Premium',
        description:
          'Tratamento alisante que reduz o frizz e deixa os cabelos lisos e brilhantes.',
        price: 8000, // 80.00 BRL
        imageUrl: serviceImages[5],
        duration: 60,
      },
    ]

    const users = [
      {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '+55 11 91234-5678',
        image:
          'https://ui-avatars.com/api/?name=Joao+Silva&size=256&background=0D8ABC&color=fff',
      },
      {
        name: 'Thiago Oliveira',
        email: 'thiago.oliveira@email.com',
        phone: '+55 11 92345-6789',
        image:
          'https://ui-avatars.com/api/?name=Thiago+Oliveira&size=256&background=FF6B6B&color=fff',
      },
      {
        name: 'Pedro Santos',
        email: 'pedro.santos@email.com',
        phone: '+55 11 93456-7890',
        image:
          'https://ui-avatars.com/api/?name=Pedro+Santos&size=256&background=4CAF50&color=fff',
      },
      {
        name: 'Davison Costa',
        email: 'davison.costa@email.com',
        phone: '+55 11 94567-8901',
        image:
          'https://ui-avatars.com/api/?name=Davison+Costa&size=256&background=FFC107&color=fff',
      },
      {
        name: 'Lucas Pereira',
        email: 'lucas.pereira@email.com',
        phone: '+55 11 95678-9012',
        image:
          'https://ui-avatars.com/api/?name=Lucas+Pereira&size=256&background=3F51B5&color=fff',
      },
    ]

    const barberNames = [
      ['Carlos Almeida', 'Rafael Lima', 'Thiago Mendes'],
      ['Bruno Ferreira', 'Gustavo Rocha', 'Felipe Barbosa'],
      ['Marcelo Souza', 'Eduardo Costa', 'Vinicius Santos'],
      ['Rodrigo Pereira', 'Leandro Silva', 'Daniel Oliveira'],
      ['Fabio Gomes', 'Renato Dias', 'André Martins'],
      ['Sérgio Ramos', 'Paulo Henrique', 'Lucas Carvalho'],
      ['Ricardo Borges', 'Mateus Almeida', 'João Vitor'],
      ['Diego Castro', 'Fernando Lima', 'Gabriel Ribeiro'],
      ['Luciano Mendes', 'Tiago Ferreira', 'Raul Souza'],
      ['Vitor Hugo', 'Maurício Santos', 'Alexandre Costa'],
    ]

    await prisma.user.createMany({
      data: users.map((user) => ({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    })

    const createdUsers: User[] = await prisma.user.findMany()

    const barbershopsData = barberShopNames.map((name, i) => ({
      name,
      slug: generateSlug(name),
      address: addresses[i],
      imageUrl: barberShopImages[i],
      openingHours: {
        domingo: { open: null, close: null },
        'segunda-feira': { open: '08:00', close: '20:00' },
        'terça-feira': { open: '08:00', close: '20:00' },
        'quarta-feira': { open: '08:00', close: '20:00' },
        'quinta-feira': { open: '08:00', close: '20:00' },
        'sexta-feira': { open: '08:00', close: '20:00' },
        sábado: { open: '09:00', close: '18:00' },
      },
      phone: phones[i],
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    await prisma.barberShop.createMany({
      data: barbershopsData,
    })

    const barberShops = await prisma.barberShop.findMany()

    const servicesData = barberShops.flatMap((barberShop) =>
      services.map((service) => ({
        ...service,
        barberShopId: barberShop.id,
      })),
    )

    await prisma.service.createMany({
      data: servicesData,
    })

    const barbersData = barberShops.flatMap((barberShop, i) =>
      barberNames[i].map((name) => ({
        name,
        barberShopId: barberShop.id,
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=256&background=555555&color=fff`,
      })),
    )

    await prisma.barber.createMany({
      data: barbersData,
    })

    const barbers = await prisma.barber.findMany()

    const reviewComments = [
      'Corte impecável, atendimento nota 10! Voltarei com certeza.',
      'A barba ficou perfeita, o barbeiro é um artista!',
      'Ambiente incrível, superou todas as expectativas.',
      'Melhor hidratação que já fiz, cabelo renovado!',
      'Profissionalismo e estilo em cada detalhe, adorei!',
    ]

    const reviewsData = barberShops.map((barberShop, i) => {
      const user = createdUsers[i % createdUsers.length]
      const barber = barbers.filter(
        (b: Barber) => b.barberShopId === barberShop.id,
      )[i % 3]

      return {
        userId: user.id,
        barberShopId: barberShop.id,
        barberId: barber.id,
        barberShopRating: i % 2 === 0 ? 5 : 4, // Alternate 5, 4
        barberRating: i % 2 === 1 ? 5 : 4, // Alternate 4, 5
        comment: reviewComments[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    await prisma.review.createMany({
      data: reviewsData,
    })

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDatabase()
