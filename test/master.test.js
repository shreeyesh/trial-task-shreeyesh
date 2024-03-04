const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to delete all data before each test
beforeEach(async () => {
 console.log('Deleting all data before test...');
 await prisma.layoutWidget.deleteMany();
 await prisma.layout.deleteMany();
 await prisma.widget.deleteMany();
 await prisma.user.deleteMany();
});

// Test CRUD operations for User model
test('User CRUD', async () => {
 console.log('Testing User CRUD...');

 // Create a user
 const newUser = await prisma.user.create({
    data: { email: 'test@example.com', password: 'password', address: '123 Test Street' },
 });
 console.log('User created:', newUser);
 expect(newUser).toHaveProperty('email', 'test@example.com');

 // Read users
 const users = await prisma.user.findMany();
 console.log('All users:', users);
 expect(users).toBeInstanceOf(Array);

 // Update a user
 const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { address: '456 New Street' },
 });
 console.log('User updated:', updatedUser);
 expect(updatedUser).toHaveProperty('address', '456 New Street');

 // Delete a user
 const deletedUser = await prisma.user.delete({ where: { id: newUser.id } });
 console.log('User deleted:', deletedUser);
 expect(deletedUser).toHaveProperty('email', 'test@example.com');
});

// Test CRUD operations for Layout model
test('Layout CRUD', async () => {
 console.log('Testing Layout CRUD...');

 // Create a user to associate with the layout
 const user = await prisma.user.create({
    data: { email: 'layout@example.com', password: 'password', address: '123 Test Street' },
 });

 // Create a layout
 const newLayout = await prisma.layout.create({
    data: { name: 'Layout 1', userId: user.id },
 });
 console.log('Layout created:', newLayout);
 expect(newLayout).toHaveProperty('name', 'Layout 1');

 // Read layouts
 const layouts = await prisma.layout.findMany();
 console.log('All layouts:', layouts);
 expect(layouts).toBeInstanceOf(Array);

 // Update a layout
 const updatedLayout = await prisma.layout.update({
    where: { id: newLayout.id },
    data: { name: 'Updated Layout' },
 });
 console.log('Layout updated:', updatedLayout);
 expect(updatedLayout).toHaveProperty('name', 'Updated Layout');

 // Delete a layout
 const deletedLayout = await prisma.layout.delete({ where: { id: newLayout.id } });
 console.log('Layout deleted:', deletedLayout);
 expect(deletedLayout).toHaveProperty('name', 'Updated Layout');
});

// Test CRUD operations for Widget model
test('Widget CRUD', async () => {
 console.log('Testing Widget CRUD...');

 // Create a widget
 const newWidget = await prisma.widget.create({
    data: { name: 'Widget 1', description: 'A sample widget' },
 });
 console.log('Widget created:', newWidget);
 expect(newWidget).toHaveProperty('name', 'Widget 1');

 // Read widgets
 const widgets = await prisma.widget.findMany();
 console.log('All widgets:', widgets);
 expect(widgets).toBeInstanceOf(Array);

 // Update a widget
 const updatedWidget = await prisma.widget.update({
    where: { id: newWidget.id },
    data: { name: 'Updated Widget' },
 });
 console.log('Widget updated:', updatedWidget);
 expect(updatedWidget).toHaveProperty('name', 'Updated Widget');

 // Delete a widget
 const deletedWidget = await prisma.widget.delete({ where: { id: newWidget.id } });
 console.log('Widget deleted:', deletedWidget);
 expect(deletedWidget).toHaveProperty('name', 'Updated Widget');
});

// Test CRUD operations for LayoutWidget model
test('LayoutWidget CRUD', async () => {
 console.log('Testing LayoutWidget CRUD...');

 // Create a user and layout for association
 const user = await prisma.user.create({
    data: { email: 'layoutwidget@example.com', password: 'password', address: '123 Test Street' },
 });
 const layout = await prisma.layout.create({
    data: { name: 'Layout for Widget', userId: user.id },
 });

 // Create a widget
 const widget = await prisma.widget.create({
    data: { name: 'Widget for Layout', description: 'A widget for layout' },
 });

 // Create a layoutWidget
 const newLayoutWidget = await prisma.layoutWidget.create({
    data: { layoutId: layout.id, widgetId: widget.id },
 });
 console.log('LayoutWidget created:', newLayoutWidget);
 expect(newLayoutWidget).toHaveProperty('layoutId', layout.id);
 expect(newLayoutWidget).toHaveProperty('widgetId', widget.id);

 // Read layoutWidgets
 const layoutWidgets = await prisma.layoutWidget.findMany();
 console.log('All layoutWidgets:', layoutWidgets);
 expect(layoutWidgets).toBeInstanceOf(Array);

 // Update a layoutWidget
 const updatedLayoutWidget = await prisma.layoutWidget.update({
    where: { layoutId_widgetId: { layoutId: layout.id, widgetId: widget.id } },
    data: { /* Example update data */ },
 });
 console.log('LayoutWidget updated:', updatedLayoutWidget);
 expect(updatedLayoutWidget).toHaveProperty('layoutId', layout.id);


 // Delete a layoutWidget
 const deletedLayoutWidget = await prisma.layoutWidget.delete({
    where: { layoutId_widgetId: { layoutId: layout.id, widgetId: widget.id } },
 });
 console.log('LayoutWidget deleted:', deletedLayoutWidget);
 // Add expect statements for the delete operation as needed
});

// Ensure to disconnect PrismaClient after all tests
afterAll(async () => {
 await prisma.$disconnect();
});
