const {
    RunKeployServer,
    FetchTestSets,
    RunTestSet,
    FetchTestSetStatus,
    StopKeployServer,
    TestRunStatus,
    setTestRunCompletionStatus,
    cleanupProcesses,
} = require('../typescript-sdk/keployV2/keployCli');
import mongoose from 'mongoose';
const fs = require('fs');

const app = require('./app'); // Adjust the path to point to your app.js file
let server;
const { expect } = require('@jest/globals');

describe('Keploy Server Tests', () => {
    let pid;
    beforeAll(async () => {
        const caCertPath = "./ca.crt"
        process.env.NODE_EXTRA_CA_CERTS = './ca.crt';
        console.log(process.env.NODE_EXTRA_CA_CERTS,"NODE_EXTRA_CA_CERTS NODE_EXTRA_CA_CERTS")
        try {
            fs.accessSync(caCertPath, fs.constants.R_OK);
            console.log('CA certificate file is readable');
        } catch (err) {
            console.error('Error accessing CA certificate file:', err);
        }
        // fs.accessSync(caCertPath, 'utf-8');
        setTestRunCompletionStatus(false)
        console.debug("Running keploy tests along with unit tests");
        pid = process.pid;
        console.log("Sending app pid to keploy: " + pid);

        try {
            console.log("Starting keploy server");
            RunKeployServer(pid, 10, "/home/shivamsouravjha.linux/bookmyshow", 0);
            // wait for the keploy to load hooks
            await new Promise(resolve => setTimeout(resolve, 20000));
        } catch (error) {
            console.error("Error starting Keploy server:", error);
            throw error; // propagate the error so that Jest can recognize it
        }
    }, 6500000);

    afterAll(async () => {
        setTestRunCompletionStatus(true)
        await mongoose.disconnect();
        console.log("Stopping keploy server");
        try {
            await StopKeployServer();
            console.log("Keploy server stopped.");
        } catch (error) {
            console.error("Error stopping Keploy server:", error);
            throw error; // propagate the error so that Jest can recognize it
        }
        cleanupProcesses();
    }, 7000000);

    test('TestKeploy', async () => {
        let testResult = true;
        const MAX_TIMEOUT = 100000; // 1 minute timeout, adjust as necessary
        let startTime = Date.now();

        try {
            const testSets = await FetchTestSets();

            if (testSets === null) {
                throw new Error('Test sets are null');
            }

            console.log("TestSets: ", [...testSets]);

            console.log("starting user application");

            let result = true;
            for (let testset of testSets) {
                try {
                    console.log("now starting");
                    server = app.listen(process.env.PORT || 5002, () => {
                        console.log('User application started on port', process.env.PORT || 5002);
                    });
                } catch (error) {
                    console.log("got error while starting user application");
                    throw new Error(`User Application Error: ${error.message}`);
                }
                const testRunId = await RunTestSet(testset);
                let testRunStatus;

                while (true) {
                    // check status every 2 sec
                await new Promise(res => setTimeout(res, 2000));
                    testRunStatus = await FetchTestSetStatus(testRunId);
                    if (testRunStatus === TestRunStatus.RUNNING) {
                        console.log("testRun still in progress");

                        // Check if timeout has been reached
                        if (Date.now() - startTime > MAX_TIMEOUT) {
                            console.log("Timeout reached, exiting loop");
                            break;
                        }

                        continue;
                    }
                    break;
                }

                if (testRunStatus === TestRunStatus.FAILED) {
                    console.log("testrun failed");
                    result = false;
                } else if (testRunStatus === TestRunStatus.PASSED) {
                    console.log("testrun passed");
                    result = true;
                }
                console.log(`TestResult of [${testset}]: ${result}`);
                testResult = testResult && result;
                server && server.close();
            } // Updated this line to assert on testResult instead of hardcoded true
        } catch (error) {
            throw error; // propagate the error so that Jest can recognize it
        }
        expect(testResult).toBeTruthy(); // Updated this line to assert on testResult instead of hardcoded true

    }, 30000000);
}, 30000000000);