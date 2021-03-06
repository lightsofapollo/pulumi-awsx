// Copyright 2016-2018, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import * as cloudwatch from "../cloudwatch";

export namespace metrics {
    type CodebuildMetricName =
        "BuildDuration" | "Builds" | "DownloadSourceDuration" | "Duration" |
        "FailedBuilds" | "FinalizingDuration" | "InstallDuration" |
        "PostBuildDuration" | "PreBuildDuration" | "ProvisioningDuration" |
        "QueuedDuration" | "SubmittedDuration" | "SucceededBuilds" | "UploadArtifactsDuration";

    export interface CodebuildMetricChange extends cloudwatch.MetricChange {
        /**
         * Optional Project this metric should be filtered down to.
         */
        project?: aws.codebuild.Project;
    }

    /**
     * Creates an AWS/CodeBuild metric with the requested [metricName]. See
     * https://docs.aws.amazon.com/codebuild/latest/userguide/monitoring-builds.html for list of all
     * metric-names.
     *
     * Note, individual metrics can easily be obtained without supplying the name using the other
     * [metricXXX] functions.
     *
     * You can use Amazon CloudWatch to watch your builds, report when something is wrong, and take
     *  automatic actions when appropriate. You can monitor your builds at two levels:
     *
     *  * At the project level: These metrics are for all builds in the specified project only. To see
     *    metrics for a project, specify the ProjectName for the dimension in CloudWatch.
     *
     *  * At the AWS account level: These metrics are for all builds in one account. To see metrics at
     *    the AWS account level, do not enter a dimension in CloudWatch.
     *
     * CloudWatch metrics show the behavior of your builds over time. For example, you can monitor:
     *
     * * How many builds were attempted in a build project or an AWS account over time.
     * * How many builds were successful in a build project or an AWS account over time.
     * * How many builds failed in a build project or an AWS account over time.
     * * How much time CodeBuild spent executing builds in a build project or an AWS account over time.
     *
     * Metrics displayed in the CodeBuild console are always from the past three days. You can use the
     * CloudWatch console to view CodeBuild metrics over different durations.
     *
     * "ProjectName" is the only AWS CodeBuild metrics dimension. If it is specified, then the metrics
     * are for that project. If it is not specified, then the metrics are for the current AWS account.
     */
    function metric(metricName: CodebuildMetricName, change: CodebuildMetricChange = {}) {
        const dimensions: Record<string, pulumi.Input<string>> = {};
        if (change.project !== undefined) {
            dimensions.ProjectName = change.project.name;
        }

        return new cloudwatch.Metric({
            namespace: "AWS/CodeBuild",
            name: metricName,
            ...change,
        }).withDimensions(dimensions);
    }

    /**
     * Measures the duration of the build's BUILD phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function buildDuration(change?: CodebuildMetricChange) {
        return metric("BuildDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the number of builds triggered.
     *
     * Units: Count
     * Valid CloudWatch statistics: Sum
     */
    export function builds(change?: CodebuildMetricChange) {
        return metric("Builds", { statistic: "Sum", unit: "Count", ...change });
    }

    /**
     * Measures the duration of the build's DOWNLOAD_SOURCE phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function downloadSourceDuration(change?: CodebuildMetricChange) {
        return metric("DownloadSourceDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the duration of all builds over time.
     *
     * Units: Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function duration(change?: CodebuildMetricChange) {
        return metric("Duration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the number of builds that failed because of client error or because of a timeout.
     *
     * Units: Count
     * Valid CloudWatch statistics: Sum
     */
    export function failedBuilds(change?: CodebuildMetricChange) {
        return metric("FailedBuilds", { statistic: "Sum", unit: "Count", ...change });
    }

    /**
     * Measures the duration of the build's FINALIZING phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function finalizingDuration(change?: CodebuildMetricChange) {
        return metric("FinalizingDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the duration of the build's INSTALL phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function installDuration(change?: CodebuildMetricChange) {
        return metric("InstallDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the duration of the build's POST_BUILD phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function postBuildDuration(change?: CodebuildMetricChange) {
        return metric("PostBuildDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the duration of the build's PRE_BUILD phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function preBuildDuration(change?: CodebuildMetricChange) {
        return metric("PreBuildDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the duration of the build's PROVISIONING phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function provisioningDuration(change?: CodebuildMetricChange) {
        return metric("ProvisioningDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the duration of the build's QUEUED phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function queuedDuration(change?: CodebuildMetricChange) {
        return metric("QueuedDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the duration of the build's SUBMITTED phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function submittedDuration(change?: CodebuildMetricChange) {
        return metric("SubmittedDuration", { statistic: "Average", unit: "Seconds", ...change });
    }

    /**
     * Measures the number of successful builds.
     *
     * Units: Count
     * Valid CloudWatch statistics: Sum
     */
    export function succeededBuilds(change?: CodebuildMetricChange) {
        return metric("SucceededBuilds", { statistic: "Sum", unit: "Count", ...change });
    }

    /**
     * Measures the duration of the build's UPLOAD_ARTIFACTS phase.
     *
     * Units:Seconds
     * Valid CloudWatch statistics: Average (recommended), Maximum, Minimum
     */
    export function uploadArtifactsDuration(change?: CodebuildMetricChange) {
        return metric("UploadArtifactsDuration", { statistic: "Average", unit: "Seconds", ...change });
    }
}
