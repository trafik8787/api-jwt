<?php

namespace App\Http\Traits;

use Illuminate\Http\JsonResponse;

trait ResponseApi
{
    public function errorResponse(string $message, int $code): JsonResponse
    {
        return response()->json(['data' => ['error' => $message, 'code' => $code]], $code);
    }

    /**
     * @return array|array[]
     */
    public function successResponse(array $message, int $code = 200, ?string $wrapper = null): array
    {
        $message['code'] = $code;

        if ($wrapper !== null) {
            $message = [$wrapper => $message];
        }

        return $message;
    }
}
