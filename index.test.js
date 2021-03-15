/*
  This is a collection of sample tests that will test the examples provided in the
  assignment. You can run them with 'npm test'. Feel free to add your own tests,
  the pattern should be fairly obvious.
  */
const pa1 = require("./index");





describe("Test myMax", () => {

  test('myMax: assignment example', () => {
    expect(pa1.myMax([1, 2, 3])).toBe(3);
  });

  test('myMax: handles single value', () => {
    expect(pa1.myMax([1])).toBe(1);
  });

  test('myMax: handles identical values', () => {
    expect(pa1.myMax([1, 1, 2, 2])).toBe(2);
  });
});

describe("Test threshold", () => {
  test("threshold: assignment example", () => {
    expect(
      pa1.threshold(
        [
          { x: 4, y: 5 },
          { x: 2, y: 9 },
          { x: 1, y: 1 }
        ],
        "y",
        5
      )
    ).toEqual([
      { x: 4, y: 5 },
      { x: 1, y: 1 }
    ]);
  });

  test('threshold: handles empty array', () => {
    expect(pa1.threshold([], 'y', 5)).toEqual([]);
  });
});

describe("Test parseEmails", () => {
  test("parseEmails: single address", () => {
    const results = pa1.parseEmails('Patrick Troughton <ptroughton@prydon.edu>');

    expect(results).toHaveLength(1);
    expect(results[0].first).toBe('Patrick');
    expect(results[0].last).toBe('Troughton');
    expect(results[0].email).toBe('ptroughton@prydon.edu');
  });

  test("parseEmails: multiple addresses", () => {
    const input = [
      'Patrick Troughton <ptroughton@prydon.edu>',
      'Jodi Whittaker <jwhittaker@prydon.edu>',
      'Tom Baker <tbaker@prydon.edu>'
    ];

    const results = pa1.parseEmails(input);

    expect(results).toHaveLength(3);

    expect(results[0].first).toBe('Patrick');
    expect(results[0].last).toBe('Troughton');
    expect(results[0].email).toBe('ptroughton@prydon.edu');

    expect(results[1].first).toBe('Jodi');
    expect(results[1].last).toBe('Whittaker');
    expect(results[1].email).toBe('jwhittaker@prydon.edu');

    expect(results[2].first).toBe('Tom');
    expect(results[2].last).toBe('Baker');
    expect(results[2].email).toBe('tbaker@prydon.edu');
  });


  test('parseEmails: invalid strings return null', () => {
    const input = [
      'Patrick <ptroughton@prydon.edu>',
      'Jodi Whittaker <jwhittaker@prydon.edu>',
      'Jon Pertwee',
      'Peter Capaldi pcapaldi@prydon.edu',
      'Peter Davidson <pdavidson@prydon.edu',
      'Matt Smith msmith@prydon.edu>',
      'Tom Baker <tbaker@prydon.edu>'
    ];
    const results = pa1.parseEmails(input);

    expect(results).toHaveLength(input.length);

    expect(results[0]).toBeNull();
    expect(results[2]).toBeNull();
    expect(results[3]).toBeNull();
    expect(results[4]).toBeNull();
    expect(results[5]).toBeNull();

    expect(results[1].first).toBe('Jodi');
    expect(results[1].last).toBe('Whittaker');
    expect(results[1].email).toBe('jwhittaker@prydon.edu');

    expect(results[6].first).toBe('Tom');
    expect(results[6].last).toBe('Baker');
    expect(results[6].email).toBe('tbaker@prydon.edu');

  });

});


describe("Test intervalTime", () => {
  beforeEach(() => {
    // Mock the time functions for use in Jest
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers(); // Fast forward the timer, so it completes
  });

  test("intervalTime: assignment example", () => {
    const alarm = pa1.intervalAlarm([1, 0.5, 0.8]);
    expect(typeof alarm).toBe("function");
    expect(setTimeout).toHaveBeenCalledTimes(0);
    alarm();
    expect(setTimeout).toHaveBeenCalledTimes(3);
  });

  test('intervalTime: returned function calls setTimeout correct number of times when it is invoked', () => {
    const alarm = pa1.intervalAlarm([1, 0.5, 0.8]);
    expect(typeof alarm).toBe('function');
    expect(setTimeout).toHaveBeenCalledTimes(0);
    alarm();
    expect(setTimeout).toHaveBeenCalledTimes(3);
    alarm();
    expect(setTimeout).toHaveBeenCalledTimes(6);
  });

  test('intervalTime: calls setTimeout with correct time argument', () => {
    const alarm = pa1.intervalAlarm([1.3, 0.7]);
    expect(typeof alarm).toBe('function');
    expect(setTimeout).toHaveBeenCalledTimes(0);
    alarm();
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout.mock.calls[0][1]).toBe(1300);
    expect(setTimeout.mock.calls[1][1]).toBe(2000);
  });

  test("intervalTime: function is repeatable", () => {
    const alarm = pa1.intervalAlarm([1.3, 0.7]);

    expect(setTimeout).toHaveBeenCalledTimes(0);
    alarm();
    alarm();
    expect(setTimeout).toHaveBeenCalledTimes(4);
    expect(setTimeout.mock.calls[0][1]).toBe(1300);
    expect(setTimeout.mock.calls[1][1]).toBe(2000);
    expect(setTimeout.mock.calls[2][1]).toBe(1300);
    expect(setTimeout.mock.calls[3][1]).toBe(2000);
  });

  test('intervalTime: prints expected format', () => {
    const log = jest.spyOn(global.console, 'log');
    const alarm = pa1.intervalAlarm([1.3]);
    expect(typeof alarm).toBe('function');
    alarm();
    jest.runAllTimers(); // Fast forward the timer
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toBeCalledWith(
      expect.stringMatching(
        /^Interval of 1.3s completed \(\d+(\.\d+)?s elapsed\)!/
      )
    );
  });
});

describe("Test availabilityCounts", () => {
  test("availabilityCounts: Assignment examples", () => {
    expect(
      pa1.availabilityCounts(
        [
          { day: 2, start: 480, end: 495 },
          { day: 2, start: 840, end: 855 }
        ],
        [{ day: 2, start: 480, end: 555 }]
      )
    ).toEqual([
      { day: 2, start: 480, end: 495, count: 1 },
      { day: 2, start: 840, end: 855, count: 0 }
    ]);
  });


  test('availabilityCounts: availability spans multiple windows', () => {
    expect(
      pa1.availabilityCounts(
        [
          { day: 2, start: 480, end: 495 },
          { day: 2, start: 840, end: 855 },
        ],
        [
          { day: 2, start: 0, end: 1000 },
          { day: 3, start: 0, end: 1000 },
        ]
      )
    ).toEqual([
      { day: 2, start: 480, end: 495, count: 1 },
      { day: 2, start: 840, end: 855, count: 1 },
    ]);
  });

  test('availabilityCounts: handles edge conditions', () => {
    expect(
      pa1.availabilityCounts(
        [
          { day: 2, start: 480, end: 495 },
          { day: 2, start: 840, end: 855 },
        ],
        [
          { day: 2, start: 480, end: 494 },
          { day: 2, start: 481, end: 495 },
          { day: 2, start: 400, end: 480 },
          { day: 2, start: 855, end: 955 },
        ]
      )
    ).toEqual([
      { day: 2, start: 480, end: 495, count: 0 },
      { day: 2, start: 840, end: 855, count: 0 },
    ]);
  });

  test('availabilityCounts: returns a deep copy of its windows argument', () => {
    const arg = [
      { day: 2, start: 480, end: 495 },
      { day: 2, start: 840, end: 855 },
    ];
    pa1.availabilityCounts(arg, [{ day: 2, start: 480, end: 555 }]);
    expect(arg).toEqual([
      { day: 2, start: 480, end: 495 },
      { day: 2, start: 840, end: 855 },
    ]);
  });

  test('availabilityCounts: handles empty windows', () => {
    const arg = [];
    expect(
      pa1.availabilityCounts(arg, [{ day: 2, start: 480, end: 555 }])
    ).toEqual([]);
  });

  test('availabilityCounts: handles empty availabilities', () => {
    expect(
      pa1.availabilityCounts(
        [
          { day: 2, start: 480, end: 495 },
          { day: 2, start: 840, end: 855 },
        ],
        []
      )
    ).toEqual([
      { day: 2, start: 480, end: 495, count: 0 },
      { day: 2, start: 840, end: 855, count: 0 },
    ]);
  });
});
