<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb93238a7b198727daba2eb1ca0ca3276
{
    public static $files = array (
        '256558b1ddf2fa4366ea7d7602798dd1' => __DIR__ . '/..' . '/yahnis-elsts/plugin-update-checker/load-v5p5.php',
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInitb93238a7b198727daba2eb1ca0ca3276::$classMap;

        }, null, ClassLoader::class);
    }
}
