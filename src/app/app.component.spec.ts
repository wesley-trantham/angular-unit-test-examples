import { Contact } from './models/contact.model';

describe('AppComponent', () => {
  it('should add numbers', () => {
    // Arrange
    let x = 0;
    // Act
    x += 1;
    // Assert
    expect(x).toBe(1);
  });
});

describe('demo', () => {
  beforeAll(() => {
    console.log('outer beforeAll');
  });
  afterAll(() => {
    console.log('outer afterAll');
  });
  beforeEach(() => {
    console.log('outer beforeEach');
  });
  afterEach(() => {
    console.log('outer afterEach');
  });

  it('compares strings', () => {
    console.log('running outer it');
    expect('string').toBe('string');
  });

  describe('inner demo', () => {
    beforeEach(() => {
      console.log('inner beforeEach');
    });
    afterEach(() => {
      console.log('inner afterEach');
    });

    it('should add numbers', () => {
      console.log('starting inner test 1');
      const x = 1 + 1;
      expect(x).toBe(2);
    });

    it('should add more numbers', () => {
      console.log('starting inner test 2');
      const x = 2 + 2;
      expect(x).toBe(4);
    });
  });
});

describe('expects', () => {
  it('should show expects', () => {
    const a = new Contact();
    const b = new Contact();

    a.firstName = 'Adam';
    b.firstName = 'Adam';

    expect(a).toBe(b); // fails
    expect(a).toEqual(b); // succeeds!
  });

  it('handles truthy', () => {
    const a = new Contact();
    expect(a).toBeTruthy();
    expect(true).toBe(true);
    expect(true).toBeTruthy(); // avoid
  });
});
